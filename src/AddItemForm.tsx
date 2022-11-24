import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addITem: (title: string) => void
    placeholderValue: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)

    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addITem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && onClickAddItem()

    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                label={props.placeholderValue}
                error={error}
                helperText={error && 'Title is required'}
            />
            <IconButton onClick={onClickAddItem} size={'small'}><AddBoxOutlined/></IconButton>
        </div>
    );
};



