import React from 'react'
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import { Modal , Form ,Button} from 'semantic-ui-react';
import {useFirebase} from 'react-redux-firebase';

const CreateChannelForm = ({open , onOpen , onClose}) => {

    var name = "";
    const firebase = useFirebase();
    const profile = useSelector(state => state.firebase.profile)
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
      } = useForm();

    const onSubmit = ({name,description}) => {

        firebase.push("channels", {
            name,
            description,
            createdBy : {
                name : profile.name,
                avatar : profile.avatar
            }
        })

        onClose();

    }
    
    return (
       <Modal open={open} onOpen = {onOpen} onClose = {onClose}>
           <Modal.Header>Kanal Ekle</Modal.Header>
           <Modal.Content>
               <Form onSubmit = {handleSubmit(onSubmit)}>
                   <Form.Input
                    {...register("name", { required: true })}
                    fluid
                    icon = "hashtag"
                    iconPosition = "left"
                    name = "name"
                    placeholder = "#Genel"
                    onChange={(event, { name: value }) => {
                        setValue(name, value);
                      }}
                    error={errors.name ? true : false}
                   />
                    <Form.Input
                    {...register("description", { required: true, minLength: 6 })}
                    fluid
                    icon = "hashtag"
                    iconPosition = "left"
                    name = "description"
                    placeholder = "#Genel her türlü konunun konuşulabileceği bir kanaldır."
                    onChange={(event, { name: value }) => {
                        setValue(name, value);
                      }}
                    error={errors.description ? true : false}
                   />
               </Form>
           </Modal.Content>
           <Modal.Actions>
               <Button color = "black" onClick = {() => onClose()}>Vazgeç</Button>
               <Button icon = "checkmark" content = "Oluştur" positive  onClick = {() => handleSubmit(onSubmit)()}></Button>
           </Modal.Actions>
       </Modal>
    )
}

export default CreateChannelForm
