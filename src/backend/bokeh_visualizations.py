# src/backend/bokeh_visualizations.py
from bokeh.plotting import figure, show
from bokeh.models import ColumnDataSource, HoverTool, TapTool, CustomJS
from bokeh.layouts import column
from bokeh.io import output_file
from typing import List, Dict

class ResearchTimelineVisualizer:
    def __init__(self, research_data: List[Dict]):
        self.data = research_data
        self.source = ColumnDataSource(data=dict(
            years=[item['year'] for item in research_data],
            titles=[item['title'] for item in research_data],
            descriptions=[item['description'] for item in research_data],
            links=[item.get('link', '') for item in research_data]
        ))

    def create_interactive_timeline(self):
        # Create the plot
        p = figure(
            title="Adaptive Data Fusion Research Timeline", 
            x_axis_label='Year', 
            y_axis_label='Research Milestones',
            plot_height=400, 
            plot_width=800,
            tools="pan,wheel_zoom,box_zoom,reset,save,tap"
        )

        # Add circle glyphs
        circles = p.circle(
            'years', 
            'titles', 
            size=15, 
            color='navy', 
            alpha=0.5, 
            source=self.source
        )

        # Add hover tool
        hover = HoverTool(
            renderers=[circles],
            tooltips=[
                ('Year', '@years'),
                ('Title', '@titles'),
                ('Description', '@descriptions')
            ]
        )
        p.add_tools(hover)

        # Add tap tool with JavaScript callback
        tap_callback = CustomJS(args=dict(source=self.source), code="""
            const selected = source.selected.indices[0];
            if (selected !== undefined) {
                const link = source.data['links'][selected];
                if (link) {
                    window.open(link, '_blank');
                }
            }
        """)
        tap_tool = TapTool(callback=tap_callback)
        p.add_tools(tap_tool)

        return p

    def render_to_html(self, filename='research_timeline.html'):
        output_file(filename)
        show(self.create_interactive_timeline())

# Example usage
def generate_research_timeline():
    research_data = [
        {
            'year': 2022,
            'title': 'AI Ethics Framework',
            'description': 'Developed comprehensive AI ethics guidelines',
            'link': 'https://example.com/research/ai-ethics'
        },
        {
            'year': 2023,
            'title': 'Autonomous Agent Genome',
            'description': 'Advanced research on adaptive AI systems',
            'link': 'https://example.com/research/autonomous-agents'
        }
    ]
    
    visualizer = ResearchTimelineVisualizer(research_data)
    visualizer.render_to_html()

# Flask endpoint to serve the visualization
from flask import Flask, send_file

app = Flask(__name__)

@app.route('/research-timeline')
def research_timeline():
    generate_research_timeline()
    return send_file('research_timeline.html')