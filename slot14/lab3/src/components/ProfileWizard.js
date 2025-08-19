import React, { useReducer, useMemo, useCallback, useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import ProfileSummary from "./ProfileSummary";

const initialState = {
    step: 0,
    about: { name: "", email: "" },
    account: { username: "", password: "", confirm: "", question: "", answer: "" },
    address: { city: "", street: "" },
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_ABOUT":
            return { ...state, about: { ...state.about, ...action.payload } };
        case "SET_ACCOUNT":
            return { ...state, account: { ...state.account, ...action.payload } };
        case "SET_ADDRESS":
            return { ...state, address: { ...state.address, ...action.payload } };
        case "SET_AVATAR":
            return { ...state, avatar: action.payload };
        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };
        case "PREV_STEP":
            return { ...state, step: state.step - 1 };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

function ProfileWizard({ show, onHide }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [submitted, setSubmitted] = useState(false);

    const totalSteps = 3;

    const isStepValid = useMemo(() => {
        if (state.step === 0) {
            return state.about.name && state.about.email.includes("@");
        }
        if (state.step === 1) {
            const { username, password, confirm, question, answer } = state.account;
            const validUsername = username.length >= 6;
            const validPassword =
                password.length >= 8 &&
                /[A-Z]/.test(password) &&
                /\d/.test(password) &&
                /[^A-Za-z0-9]/.test(password);
            return validUsername && validPassword && password === confirm && question && answer;
        }
        if (state.step === 2) {
            return state.address.country !== "";
        }
        return false;
    }, [state]);

    const handleNext = useCallback(() => {
        if (isStepValid) {
            if (state.step < totalSteps - 1) {
                dispatch({ type: "NEXT_STEP" });
            } else {
                setSubmitted(true);
            }
        }
    }, [isStepValid, state.step]);

    const handlePrev = useCallback(() => {
        if (state.step > 0) {
            dispatch({ type: "PREV_STEP" });
        }
    }, [state.step]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => dispatch({ type: "SET_AVATAR", payload: reader.result });
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <>
            {/* Wizard Modal */}
            <Modal show={show && !submitted} onHide={onHide} size="lg" className="profile-wizard">
                <Modal.Header closeButton>
                    <Modal.Title>Build Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Tabs hiển thị bước */}
                    <div className="profile-tabs">
                        <button className={`profile-tab ${state.step === 0 ? "active" : ""}`}>About</button>
                        <button className={`profile-tab ${state.step === 1 ? "active" : ""}`}>Account</button>
                        <button className={`profile-tab ${state.step === 2 ? "active" : ""}`}>Address</button>
                    </div>

                    {/* Form nội dung */}
                    <div className="profile-form">
                        {state.step === 0 && (
                            <AboutForm data={state.about} dispatch={dispatch} onFileChange={handleFileChange} />
                        )}
                        {state.step === 1 && <AccountForm data={state.account} dispatch={dispatch} />}
                        {state.step === 2 && <AddressForm data={state.address} dispatch={dispatch} />}
                    </div>

                    {/* Footer nút điều hướng */}
                    <div className="profile-footer">
                        {state.step > 0 && (
                            <Button className="btn-prev" onClick={handlePrev}>
                                Previous
                            </Button>
                        )}
                        <Button
                            className={state.step === totalSteps - 1 ? "btn-finish" : "btn-next"}
                            onClick={handleNext}
                            disabled={!isStepValid}
                        >
                            {state.step === totalSteps - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Profile Summary Modal */}
            <ProfileSummary
                show={submitted}
                onHide={() => {
                    setSubmitted(false);
                    onHide();
                    dispatch({ type: "RESET" });
                }}
                profile={state}
            />

            {/* Toast */}
            <Toast
                bg="success"
                show={submitted}
                className="position-fixed bottom-0 end-0 m-3"
                delay={3000}
                autohide
            >
                <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
            </Toast>
        </>
    );
}

export default ProfileWizard;
