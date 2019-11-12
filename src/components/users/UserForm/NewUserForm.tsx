import * as React from "react";
import useForm from "react-hook-form";
import Button from "components/Button";
import { Select, Switch, Input, Tooltip } from "antd";
import BackConfirmation from "../BackConfirmation";
import EditUserFormProps from "./EditUserFormProps";
import useServiceUrl from "startup/config/useServiceUrl";
import styled from "styled-components";

const { Option } = Select;
const { TextArea } = Input;

const UserForm: React.FunctionComponent<EditUserFormProps> = ({
  onSubmit,
  onBack,
  onCancel,
  onValidate,
  user,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    getValues,
    formState,
  } = useForm({
    mode: "onBlur",
  });
  const { authenticationServiceUrl } = useServiceUrl();
  const [showBackConfirmation, setShowBackConfirmation] = React.useState(false);

  const hasErrors = errors.email !== undefined || errors.password !== undefined;
  const { password, verifyPassword, email } = getValues();
  console.log(watch("example"));
  console.log("isValid: " + formState.isValid);
  console.log("dirty: " + formState.dirty);
  console.log({ errors });
  console.log({ hasErrors });

  const ValidationMessage = styled.span`
    color: red;
  `;

  const requiredFieldText = "This field is required.";
  const MandatoryIndicator = () => (
    <Tooltip title={requiredFieldText}>
      <ValidationMessage>*</ValidationMessage>
    </Tooltip>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="header">
        <Button
          type="button"
          onClick={() =>
            formState.dirty ? setShowBackConfirmation(true) : onBack()
          }
          icon="arrow-left"
          text="Back"
        />
      </div>
      <div>
        <div className="container">
          <input name="id" type="hidden" />
          <div className="section">
            <div className="section__title">
              <h3>Account</h3>
            </div>
            <div className="section__fields">
              <div className="section__fields__row">
                <div className="field-container vertical">
                  <label>First name</label>
                  <input name="firstName" type="text" ref={register} />
                </div>
                <div className="field-container__spacer" />
                <div className="field-container vertical">
                  <label>Last name</label>
                  <input name="lastName" type="text" ref={register} />
                </div>
              </div>
              <div className="section__fields">
                <div className="section__fields__row">
                  <div className="field-container vertical">
                    <label>
                      Email
                      <MandatoryIndicator />
                    </label>
                    <div className="field-container--with-validation">
                      <input name="email" ref={register({ required: true })} />
                      {errors.email && (
                        <ValidationMessage>
                          {requiredFieldText}
                        </ValidationMessage>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section__title">
                <h3>Status</h3>
              </div>
              <div className="section__fields">
                <div className="section__fields__row">
                  <div className="field-container vertical">
                    <label>Account status</label>
                    <Select>
                      <Option value="enabled">Active</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option disabled value="inactive">
                        Inactive (because of disuse)
                      </Option>
                      <Option disabled value="locked">
                        Locked (because of failed logins)
                      </Option>
                    </Select>
                  </div>
                  <div className="field-container__spacer" />
                  <div className="field-container--with-validation">
                    <label>Never expires?</label>
                    <Switch ref={register} />
                    {/* <input
                      name="neverExpires"
                      // label="neverExpires"
                      component={CheckboxField}
                      ref={register}
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section__title">
                <h3>Password</h3>
              </div>
              <div className="section__fields">
                <div className="section__fields__row">
                  <div className="field-container vertical">
                    <label>
                      Password
                      <MandatoryIndicator />
                    </label>
                    <div className="field-container--with-validation">
                      <input
                        name="password"
                        type="password"
                        ref={register({
                          required: true,
                          validate: value =>
                            onValidate(value, verifyPassword, email),
                        })}
                      />
                      {errors.password && (
                        <ValidationMessage>
                          {errors.password.message}
                        </ValidationMessage>
                      )}
                    </div>
                  </div>
                  <div className="field-container__spacer" />
                  <div className="field-container vertical">
                    <label>
                      Verify password
                      <MandatoryIndicator />
                    </label>
                    <div className="field-container--with-validation">
                      <input
                        ref={register({
                          required: true,
                          validate: value =>
                            onValidate(value, verifyPassword, email),
                          // validateAsync(
                          //   {
                          //     newPassword: value,
                          //     verifyPassword,
                          //     email,
                          //   },
                          //   authenticationServiceUrl,
                          // ),
                        })}
                        name="verifyPassword"
                        type="password"
                      />
                      {errors.verifyPassword && (
                        <ValidationMessage>
                          {errors.verifyPassword.message}
                        </ValidationMessage>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="section__fields__row">
                <div className="field-container">
                  <label>Force a password change at next login</label>
                  <div className="field-container__spacer" />
                  <div className="field-container--with-validation">
                    <Switch ref={register} />
                    {/* <input
                      name="forcePasswordChange"
                      label="forcePasswordChange"
                      component={CheckboxField}
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section__title">
                <h3>Comments</h3>
              </div>
              <div className="section__fields">
                <div className="section__fields__row 1-column">
                  <TextArea
                    rows={3}
                    className="section__fields__comments"
                    name="comments"
                  />
                </div>
              </div>
            </div>

            {/* {showCalculatedFields && !!userBeingEdited ? (
              <React.Fragment>
                {!!userBeingEdited.loginCount ? (
                  <div className="section">
                    <div className="section__title">
                      <h3>Audit</h3>
                    </div>
                    <div className="section__fields--copy-only">
                      <div className="section__fields_row">
                        <LoginFailureCopy
                          attemptCount={userBeingEdited.loginCount}
                        />
                        <LoginStatsCopy
                          lastLogin={userBeingEdited.lastLogin}
                          loginCount={userBeingEdited.loginCount}
                          dateFormat={dateFormat}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  undefined
                )}

                <div className="section">
                  <div className="section__title">
                    <h3>Audit</h3>
                  </div>
                  <div className="section__fields--copy-only">
                    <div className="section__fields__rows">
                      <AuditCopy
                        createdOn={userBeingEdited.createdOn}
                        createdBy={userBeingEdited.createdByUser}
                        updatedOn={userBeingEdited.updatedOn}
                        updatedBy={userBeingEdited.updatedByUser}
                        dateFormat={dateFormat}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              undefined
            )} */}
          </div>
        </div>

        <div className="footer">
          <Button
            appearance="contained"
            action="primary"
            type="submit"
            disabled={!formState.dirty || hasErrors}
            icon="save"
            text="Save"
            // isLoading={isSaving}
          />
          <Button
            appearance="contained"
            action="secondary"
            icon="times"
            onClick={() => onCancel()}
            text="Cancel"
          />
        </div>
        <BackConfirmation
          isOpen={showBackConfirmation}
          onGoBack={() => onBack()}
          hasErrors={hasErrors}
          onSaveAndGoBack={onSubmit}
          onContinueEditing={() => setShowBackConfirmation(false)}
        />
      </div>
    </form>
  );
};

export default UserForm;
