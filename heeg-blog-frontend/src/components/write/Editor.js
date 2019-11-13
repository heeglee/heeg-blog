import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillWraper = styled.div`
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;

const Editor = ({ title, body, onChangeField }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: 'ENTER CONTENT HERE',
            modules: {
                // https://quilljs.com/docs/modules/toolbar/
                toolbar: [
                    [
                        { header: '1' }, { header: '2' }
                    ],
                    [
                        'bold', 'italic', 'underline', 'strike'
                    ],
                    [
                        { list: 'ordered' }, { list: 'bullet' }
                    ],
                    [
                        'blockquote', 'code-block', 'link', 'image'
                    ],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({ key: 'body', value: quill.root.innerHTML });
            }
        });
    }, [onChangeField]);

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    };

    return (
        <EditorBlock>
            <TitleInput placeholder="TITLE" onChange={onChangeTitle} value={title} />
            <QuillWraper>
                <div ref={quillElement} />
            </QuillWraper>
        </EditorBlock>
    );
};

export default Editor;