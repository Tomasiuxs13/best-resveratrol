import React, { useEffect } from 'react';

interface SchemaInjectorProps {
    schema: object | null;
}

const SchemaInjector: React.FC<SchemaInjectorProps> = ({ schema }) => {
    useEffect(() => {
        const scriptId = 'json-ld-schema';
        const existingScript = document.getElementById(scriptId);
        
        // Remove old script if it exists
        if (existingScript) {
            existingScript.remove();
        }

        // Add new script if schema is provided
        if (schema) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            try {
                script.innerHTML = JSON.stringify(schema);
                document.head.appendChild(script);
            } catch (e) {
                console.error("Failed to stringify schema", e);
            }
        }
        
        return () => {
            // Cleanup on component unmount
            const scriptOnCleanup = document.getElementById(scriptId);
            if (scriptOnCleanup) {
                scriptOnCleanup.remove();
            }
        };
    }, [schema]);

    return null; // This component doesn't render anything visible
};

export default SchemaInjector;
