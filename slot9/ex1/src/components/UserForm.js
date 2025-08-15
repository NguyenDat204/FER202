import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import ErrorAlert from "./ErrorAlert";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const age = parseInt(formData.age, 10);

    // Tên
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự!";
    }

    // Tuổi
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(age)) {
      newErrors.age = "Tuổi phải là số!";
    } else if (age < 18 || age > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }

    // Số điện thoại
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10-15 chữ số!";
    }

    // Giới tính
    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính!";
    }

    // Đồng ý điều khoản
    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container>
      <h3>Form Đăng Ký</h3>
      <ErrorAlert show={showAlert} message="Vui lòng kiểm tra các trường hợp lỗi." />

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          label="Tuổi"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <FormSelect
          label="Giới tính"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: "male", label: "Nam" },
            { value: "female", label: "Nữ" },
          ]}
          error={errors.gender}
        />

        <FormCheckbox
          label="Đồng ý với điều khoản"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          error={errors.agree}
        />

        <Button variant="primary" type="submit">
          Gửi
        </Button>
      </form>
    </Container>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
