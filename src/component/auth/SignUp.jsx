import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Form, Segment, Button, Grid, Message } from "semantic-ui-react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const firebase = useFirebase();

  var name = "";
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    //  register({name : "email" }, {required : true});
    //  register({name : "password" },{required : true , minLength : 6})
  }, []);

  const onSubmit = ({ username, email, password }, e) => {
    setSubmitting(true);
    setFbErrors([]);

    const [first, last] = username.split(" ");

    firebase
      .createUser(
        { email, password },
        {
          name: username,
          avatar: `https://ui.avatars.com/api/?name${first}+${last}&background=random&color=fff`,
        }
      )
      .then((user) => {
        console.log(user);
       
      })
      .catch((err) => {
        console.log(err);
        setFbErrors([{message : err.message}])
       
      })
      .finally(()=> {
        setSubmitting(false)
      })
  };

  //! arrow func içinde, tekrar bir arrow func döndürmek istersek, parantezler içinde return kullanmak zorundayız.

  const displayErrors = () => fbErrors.map((error, index) => <p key = {index} >{error.message}</p>);

  return (
    <Grid 
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 className={styles.formHeader}>
          Chatify
          <span>.io</span>
        </h1>

        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Segment>
            <Form.Input
              {...register("username", { required: true })}
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              onChange={(event, { name: value }) => {
                setValue(name, value);
              }}
              placeholder="Kullanıcı Adı"
              type="text"
              error={errors.username ? true : false}
            />

            <Form.Input
              {...register("email", { required: true })}
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              onChange={(event, { name: value }) => {
                setValue(name, value);
              }}
              placeholder="Email Adresi"
              type="email"
              error={errors.email ? true : false}
            />

            <Form.Input
              {...register("password", { required: true, minLength: 6 })}
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              onChange={(event, { name: value }) => {
                setValue(name, value);
              }}
              placeholder="Şifre"
              type="password"
              error={errors.password ? true : false}
            />

            {/* <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Kullanıcı Adı"
              type="text"
            ></Form.Input> 

            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              placeholder="Email Adresi"
              type="email"
            ></Form.Input>

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              placeholder="Şifre"
              type="password"
            ></Form.Input> */}

            <Button
              type="submit"
              color="purple"
              fluid
              size="large"
              disabled={submitting}
            >
              Kayıt Ol
            </Button>
          </Segment>
        </Form>
        
        {
          fbErrors.length > 0 && (
            <Message error>{displayErrors()}</Message>
          )
        }

        <Message>
          Zaten bir hesabın var mı ? <Link to="/login">GİRİŞ YAP</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
