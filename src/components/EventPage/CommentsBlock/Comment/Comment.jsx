import React from 'react';
import './Comment.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';
import { deleteCommentApiCall, editCommentApiCall } from '../../../../api/comments';


export default function Comment({comment}){
    const [visible, setVisible] = React.useState(false);
    const [editing, setEditing] = React.useState(false)

    const [editText, setEditText] = React.useState(comment.text)
    const [commentText, setCommentText] = React.useState(comment.text)

    const deleteComment = async () => {
        await deleteCommentApiCall(comment.id)
        window.location.reload()
    }

    const editComment = async () => {
        const response = await editCommentApiCall(comment.id, editText)
        if (response) {
            setCommentText(editText);
            setEditing(false);
        }
    }

    return(
        <div className={'comment'}>
            {localStorage.getItem('userId') == comment.author &&
            <>
            <img onClick={() => setEditing(true)} className={'edit'} src={'https://img.icons8.com/material-rounded/48/4a90e2/edit--v1.png'}/>
            <img onClick={() => setVisible(true)} className={'delete'} src="https://img.icons8.com/material-outlined/48/fa314a/trash--v1.png"/>
            </>}
            <p>{comment.author_name}</p>
            <p>{commentText}</p>
            <Dialog open={visible}>
                <DialogTitle>{'Вы уверены, что хотите удалить комментарий?'}</DialogTitle>
                <DialogActions>
                    <Button style={{backgroundColor: '#006ab3', color: 'white', fontFamily: 'Oswald'}} onClick={() => setVisible(false)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={() => deleteComment()} style={{backgroundColor: 'red', color: 'white', fontFamily: 'Oswald'}} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editing} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Измените текст комментария</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    margin="dense"
                    id="name"
                    label="Комментарий"
                    variant="outlined"
                    color={'#006ab3'}
                    multiline
                    minRows={4}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button style={{backgroundColor: 'red', color: 'white', fontFamily: 'Oswald'}} onClick={() => setEditing(false)} color="primary">
                    Отмена
                </Button>
                <Button style={{backgroundColor: '#006ab3', color: 'white', fontFamily: 'Oswald'}} onClick={() => editComment()} color="primary">
                    Сохранить
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}