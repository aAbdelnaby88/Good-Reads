import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { updateRegisterField } from "../../actions/registerActions";
class RegisterForm extends Component {
  onChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(name, value);
  };

  onConfirmPasswordChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(
      "isConfirmPasswordInvalid",
      this.props.password != value
    );

    this.props.updateRegisterField(name, value);
  };

  onPasswordChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(
      "isConfirmPasswordInvalid",
      this.props.passwordConfirm != value
    );

    this.props.updateRegisterField(name, value);
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submmiting");
    const {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      image,
    } = this.props;
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      image,
      isConfirmPasswordInvalid,
    } = this.props;
    return (
      <Form method="POST" onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="firstname"
            placeholder="first name"
            onChange={this.onChange}
            value={firstname}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastname"
            placeholder="last name"
            onChange={this.onChange}
            value={lastname}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="somthing@example.com"
            onChange={this.onChange}
            value={email}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.onPasswordChange}
            value={password}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="confirm password"
            onChange={this.onConfirmPasswordChange}
            value={passwordConfirm}
            invalid={isConfirmPasswordInvalid}
            required
          />
          <FormFeedback>Confirm password does not match.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <CustomInput
            id="image"
            type="file"
            name="image"
            placeholder="choose image"
            onChange={this.onChange}
            value={image}
          />
        </FormGroup>
        <Button type="submit">Sign up</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    image,
    isConfirmPasswordInvalid,
  } = state.register;
  return {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    image,
    isConfirmPasswordInvalid,
  };
};

export default connect(mapStateToProps, { updateRegisterField })(RegisterForm);
