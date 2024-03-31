import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import parse from "html-react-parser"

function RichEditor() {
    const [content, setContent] = useState()

    const onChange = (value) => {
        setContent(value)
    }

    return (
        <>
            <div style={{ margin: "200px" }}>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    init={{
                        menubar: false,
                        branding: false,
                        height: 500,
                        plugins: 'anchor autolink charmap emoticons image link lists media table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed linkchecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | backcolor forecolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                    }}
                    onEditorChange={onChange}
                    initialValue="Start writing your travlog ..."
                />
                <div>
                    {parse(`${content}`)}
                </div>
            </div>
        </>
    );
}

export default RichEditor