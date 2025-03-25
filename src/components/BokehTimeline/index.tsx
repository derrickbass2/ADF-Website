// src/components/BokehTimeline/index.tsx
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './BokehTimeline.module.scss';

interface BokehTimelineProps {
    researchData?: Array<Record<string, unknown>>;
}

const BokehTimeline: React.FC<BokehTimelineProps> = ({ researchData }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await axios.get('/research-timeline', {
                    responseType: 'text'
                });
                
                if (iframeRef.current) {
                    const iframe = iframeRef.current;
                    iframe.srcdoc = response.data;
                }
            } catch (error) {
                console.error('Failed to fetch Bokeh timeline', error);
            }
        };

        fetchTimeline();
    }, [researchData]);

    return (
        <div className={styles.bokehTimelineContainer}>
            <iframe 
                ref={iframeRef}
                className={styles.bokehIframe}
                title="Research Timeline"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
};

export default BokehTimeline;