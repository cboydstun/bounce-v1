// components/DynamicQuillEditor.jsx
import React, { useState, useEffect, useRef } from 'react';

import './DynamicQuillEditor.css';

const DynamicQuillEditor = ({ value, onChange, placeholder, name }) => {
    const [QuillComponent, setQuillComponent] = useState(null);
    const editorRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-quill').then(module => {
                setQuillComponent(() => module.default);
            });
            // Import Quill styles
            import('react-quill/dist/quill.snow.css');
        }
    }, []);

    if (!QuillComponent) {
        return <div>Loading editor...</div>;
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div ref={editorRef} className="quill-editor">
            <QuillComponent
                theme="snow"
                value={value}
                onChange={(content) => onChange(content, { container: { dataset: { name } } })}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
        </div>
    );
};

export default DynamicQuillEditor;