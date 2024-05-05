import ComponentLoader from '@components/loaders/ComponentLoader';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';

function RichEditor({ setEditorLoading, editorLoading, onChange }) {

    useEffect(() => {
        setEditorLoading(false)
    }, [])

    return (
        <>
            {editorLoading ?
                <ComponentLoader /> :
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    init={{
                        menubar: false,
                        branding: false,
                        height: 600,
                        resize: false,
                        plugins: 'anchor autolink charmap emoticons image link lists media table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed linkchecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect inlinecss markdown',
                        toolbar: 'undo redo | blocks | bold italic underline strikethrough | backcolor forecolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                    }}
                    onEditorChange={(value) => onChange(value)}
                    initialValue="Start writing your travlog ..."
                />
            }
        </>
    );
}

export default RichEditor