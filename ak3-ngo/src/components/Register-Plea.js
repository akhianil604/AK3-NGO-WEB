import React, { useState, useEffect } from "react";

const RegisterPlea = ({ MyQueries, setMyQueries })=>{
  const [formData, setFormData] = useState({
    victimName: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    maritalStatus: '',
    education: 'None',
    address: '',
    city: '',
    state: '',
    title: '',
    category: 'Harassment',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handlePleaSubmit = (e) => {
    e.preventDefault();
    
    const newTask={title: formData.title,
      category: formData.category,
      description: formData.description
    }
    setMyQueries([...MyQueries, newTask]);
    console.log(formData);
    setFormData({
      victimName: '',
      gender: '',
      dob: '',
      phone: '',
      email: '',
      maritalStatus: '',
      education: 'None',
      address: '',
      city: '',
      state: '',
      title: '',
      category: 'Harassment',
      description: '',
      file: null,
    });
  };

  return (
    <section id="RegisterPlea">
      <form className="pleaForm" onSubmit={handlePleaSubmit}>
        <div className="form-group">
          <label htmlFor="victimName">Victim's Name:</label>
          <input
            type="text"
            id="victimName"
            name="victimName"
            value={formData.victimName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              /> Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              /> Others
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Marital Status:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Minor"
                checked={formData.maritalStatus === 'Minor'}
                onChange={handleChange}
              /> Minor
            </label>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Unmarried"
                checked={formData.maritalStatus === 'Unmarried'}
                onChange={handleChange}
              /> Unmarried
            </label>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Married"
                checked={formData.maritalStatus === 'Married'}
                onChange={handleChange}
              /> Married
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="education">Educational Qualification:</label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="None">Schooling Not Completed</option>
            <option value="Primary">10th Grade Pass</option>
            <option value="Secondary">12th Grade Pass</option>
            <option value="Diploma">Diploma</option>
            <option value="UG">Undergraduate</option>
            <option value="PG">Graduate/PostGraduate</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Residential Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City/Town:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Harassment">Harassment</option>
            <option value="Forced Labour">Forced Labour</option>
            <option value="Human Trafficking">Human Trafficking</option>
            <option value="Child Marriage">Child Marriage</option>
            <option value="Domestic Violence">Domestic Violence</option>
            <option value="Dowry">Dowry</option>
            <option value="Assistance">Rehabilitation-Assistance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Choose File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default RegisterPlea;


/* <section id="RegisterPlea">
          <form className="pleaForm" onSubmit={handlePleaSubmit}>
            {/* Form content as per original HTML }
            <div className="form-group">
              <label for="victimName">Victim's Name:</label>
              <input type="text" id="victimName" name="victimName" required />
            </div>
            <div class="form-group">
              <label>Gender:</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="gender" value="Male" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" /> Female
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="dob">Date of Birth:</label>
              <input type="date" id="dob" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone:</label>
              <input type="tel" id="phone" required />
            </div>
            <div class="form-group">
              <label for="email">Email Address:</label>
              <input type="email" id="email" required />
            </div>
            <div class="form-group">
              <label>Marital Status:</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="maritalStatus" value="Minor" />
                  Minor
                </label>
                <label>
                  <input type="radio" name="maritalStatus" value="Unmarried" />
                  Unmarried
                </label>
                <label>
                  <input type="radio" name="maritalStatus" value="Married" />
                  Married
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="education">Educational Qualification:</label>
              <select id="education" required>
                <option value="None">Schooling Not Completed</option>
                <option value="Primary">10th Grade Pass</option>
                <option value="Secondary">12th Grade Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Graduate/PostGraduate</option>
              </select>
            </div>
            <div class="form-group">
              <label for="address">Residential Address:</label>
              <textarea id="address" required></textarea>
            </div>
            <div class="form-group">
              <label for="city">City/Town:</label>
              <input type="text" id="city" required />
            </div>
            <div class="form-group">
              <label for="state">State:</label>
              <input type="text" id="state" required />
            </div>
            <div class="form-group">
              <label for="category">Category:</label>
              <select id="category" required>
                <option value="Harassment">Harassment</option>
                <option value="Forced Labour">Forced Labour</option>
                <option value="Human Trafficking">Human Trafficking</option>
                <option value="Child Marriage">Child Marriage</option>
                <option value="Domestic Violence">Domestic Violence</option>
                <option value="Dowry">Dowry</option>
                <option value="Assistance">Rehabilitation-Assistance</option>
              </select>
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="file">Choose File:</label>
              <input type="file" id="file" required />
            </div>
            {/* Add remaining form fields }
            <button type="submit">Submit</button>
          </form>
        </section> */