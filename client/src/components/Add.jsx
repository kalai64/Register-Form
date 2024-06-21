import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const validate = values => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if (values.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }

  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if (values.lastname.length > 20) {
    errors.lastname = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.gender) {
    errors.gender = 'Required';
  }

  if (!values.city) {
    errors.city = 'Required';
  } else if (values.city.length > 15) {
    errors.city = 'Must be 15 characters or less';
  }

  if (!values.state) {
    errors.state = 'Required';
  } else if (values.state.length > 15) {
    errors.state = 'Must be 15 characters or less';
  }

  if (!values.zip) {
    errors.zip = 'Required';
  } else if (values.zip.length > 6) {
    errors.zip = 'Must be 6 characters or less';
  }

  if (!values.file) {
    errors.file = 'Required';
  }

  return errors;
};

function Add() {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      city: '',
      state: '',
      zip: '',
      file: null,
    },
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      try {
        const result = await axios.post('http://localhost:8000/createUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        navigate('/users');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="d-flex vh-200 bg-white justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-5 shadow-lg'>
        <h2>Registration Form</h2>
          <br />
          <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.lastname}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">Gender</label>
              <div className="form-floating">
                <select className="form-select" id="floatingSelect" name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.gender}</div>
                ) : null}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.city}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
              />
              {formik.touched.state && formik.errors.state ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.state}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">Zip</label>
              <input type="text" className="form-control" name="zip"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zip}
              />
              {formik.touched.zip && formik.errors.zip ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.zip}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="form-label">PDF File</label>
              
              <input type="file" className="form-control" name="file"
                onChange={(event) => {
                  formik.setFieldValue('file', event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.file && formik.errors.file ? (
                <div style={{ color: 'red', fontWeight: '600' }}>{formik.errors.file}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
  );
}

export default Add;
