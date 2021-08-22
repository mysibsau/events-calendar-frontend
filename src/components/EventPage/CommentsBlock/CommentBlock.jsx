import React from 'react';
import Comment from './Comment/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';
import { createCommentApiCall } from '../../../api/comments';


export default function CommentBlock({eventId, comments, onUpdate}){
    const [comment, setComment] = React.useState('')
    const [adding, setAdding] = React.useState(false)

    const createComment = async () => {
        const response = createCommentApiCall(eventId, comment)
        if(response) {
            setAdding(false)
            window.location.reload();
        }
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row',}}>
            <h3 style={{marginRight: 10}}>Комментарии</h3>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <img style={{height: 25, width: 25, cursor: 'pointer'}} onClick={() => setAdding(true)} src="https://img.icons8.com/material-rounded/48/4a90e2/plus--v1.png"/>
            </div>
            </div>
            {comments.map(comment => {
                return <Comment comment={comment} />
            })}
            <Dialog open={adding} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Напишите комментарий</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    value={comment}
                    onChange={e => setComment(e.target.value)}
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
                <Button style={{backgroundColor: 'red', color: 'white', fontFamily: 'Oswald'}} onClick={() => setAdding(false)} color="primary">
                    Отмена
                </Button>
                <Button style={{backgroundColor: '#006ab3', color: 'white', fontFamily: 'Oswald'}} onClick={() => createComment()} color="primary">
                    Сохранить
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}