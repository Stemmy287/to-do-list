import React, {ChangeEvent,KeyboardEvent , useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (nextTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offEditMode()
    }

    return (
        isEditMode
            ?<TextField onKeyDown={onKeyDownChangeTitle} onChange={onChangeSetLocalTitle} value={title} onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

