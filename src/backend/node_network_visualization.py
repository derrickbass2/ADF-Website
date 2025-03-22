# src/backend/node_network_visualization.py
from bokeh.plotting import figure
from bokeh.models import (
    ColumnDataSource, 
    HoverTool, 
    TapTool, 
    CustomJS, 
    MultiLine, 
    Circle, 
    NodesAndLinkedEdges
)
from bokeh.layouts import column
from bokeh.io import output_file, show
from flask import app, send_file
import networkx as nx

class NodeNetworkVisualizer:
    def __init__(self, nodes_data):
        # Create a networkx graph
        self.G = nx.Graph()
        
        # Add nodes and edges based on your node structure
        for node in nodes_data:
            self.G.add_node(node['id'], 
                             name=node['name'], 
                             description=node.get('description', ''),
                             route=node.get('route', ''))
            
            # Add edges for hierarchical relationships
            if 'children' in node:
                for child in node['children']:
                    self.G.add_edge(node['id'], child['id'])

    def create_interactive_network(self):
        # Prepare data for Bokeh
        node_xs, node_ys = nx.spring_layout(self.G)
        
        # Create ColumnDataSource
        node_source = ColumnDataSource({
            'x': list(node_xs.values()),
            'y': list(node_ys.values()),
            'node_label': [self.G.nodes[node]['name'] for node in self.G.nodes],
            'description': [self.G.nodes[node].get('description', '') for node in self.G.nodes],
            'route': [self.G.nodes[node].get('route', '') for node in self.G.nodes]
        })

        # Create edge source
        edge_xs, edge_ys = [], []
        for start_node, end_node in self.G.edges():
            x0, y0 = node_xs[start_node]
            x1, y1 = node_xs[end_node]
            edge_xs.append([x0, x1])
            edge_ys.append([y0, y1])

        edge_source = ColumnDataSource(
            data=dict(xs=edge_xs, ys=edge_ys)
        )

        # Create the plot
        plot = figure(
            title="Adaptive Data Fusion Node Network",
            tools="pan,wheel_zoom,box_zoom,reset,save,tap",
            width=800, 
            height=600
        )

        # Add edges
        plot.multi_line('xs', 'ys', line_color='gray', line_alpha=0.5, source=edge_source)

        # Add nodes
        nodes = plot.circle('x', 'y', size=20, source=node_source, 
                             color='navy', alpha=0.5)

        # Add hover tool
        hover = HoverTool(renderers=[nodes], tooltips=[
            ('Name', '@node_label'),
            ('Description', '@description')
        ])
        plot.add_tools(hover)

        # Add tap tool with JavaScript callback
        tap_callback = CustomJS(args=dict(source=node_source), code="""
            const selected = source.selected.indices[0];
            if (selected !== undefined) {
                const route = source.data['route'][selected];
                if (route) {
                    window.open(route, '_blank');
                }
            }
        """)
        tap_tool = TapTool(callback=tap_callback)
        plot.add_tools(tap_tool)

        return plot

    def render_to_html(self, filename='node_network.html'):
        output_file(filename)
        show(self.create_interactive_network())

# Flask endpoint
@app.route('/node-network')
def node_network():
    nodes_data = [
        {'id': 1, 'name': 'Node 1', 'description': 'Description 1', 'route': 'http://example.com/1', 'children': [{'id': 2}]},
        {'id': 2, 'name': 'Node 2', 'description': 'Description 2', 'route': 'http://example.com/2'}
    ]  # Example data, replace with actual data source
    visualizer = NodeNetworkVisualizer(nodes_data)
    visualizer.render_to_html()
    return send_file('node_network.html')