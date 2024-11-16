import React, { useState } from "react";

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
        category: [],
        description: '',
        // file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "category"){
            setFormData(prevState => ({
                ...prevState,
                [name]: prevState[name].includes(value)
                    ? prevState[name].filter(item => item !== value)
                    : [...prevState[name], value]
            }));
        }
        else{
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        // console.log(formData);
    };

    const handlePleaSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(formData);
            const response = await fetch('http://localhost:5000/api/newRegisteredQuery', {
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token ? `Bearer ${token}` : ''  
                    },
                    body: JSON.stringify(formData), 
                    
            });

            if (!response.ok) {
                    const errorText = await response.text();  
                    throw new Error(errorText);
            }

            const newTask={title: formData.title,
                category: formData.category,
                description: formData.description,
                name: formData.victimName,
                gender: formData.gender,
                dob: formData.dob,
                email: formData.email,
                phone: formData.phone,
                marital: formData.maritalStatus,
                education: formData.education,
                address: formData.address,
                city: formData.city,
                state: formData.state,
            }
            setMyQueries([...MyQueries, newTask]);
            // console.log(formData);
            setFormData({
                victimName: '',
                gender: '',
                dob: '',
                phone: '',
                email: '',
                maritalStatus: '',
                education: '',
                address: '',
                city: '',
                state: '',
                title: '',
                category: '',
                description: '',
            });
            alert("Plea sent successfully")
    } catch (error) {
            alert('Error:', error);
    }

    };

    return (
        <div style={{position: 'absolute', width: '45rem'}}>
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
                    <label>Categories:</label>
                    <div className="checkbox-group">
                        <div>
                            <input 
                                type="checkbox" 
                                id="harassment" 
                                name="category" 
                                value="Harassment"
                                checked={formData.category.includes('Harassment')}
                                onChange={handleChange}
                            />
                            <label htmlFor="harassment">Harassment</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="forced-labour" 
                                name="category" 
                                value="Forced Labour"
                                checked={formData.category.includes('Forced Labour')}
                                onChange={handleChange}
                            />
                            <label htmlFor="forced-labour">Forced Labour</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="human-trafficking" 
                                name="category" 
                                value="Human Trafficking"
                                checked={formData.category.includes('Human Trafficking')}
                                onChange={handleChange}
                            />
                            <label htmlFor="human-trafficking">Human Trafficking</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="child-marriage" 
                                name="category" 
                                value="Child Marriage"
                                checked={formData.category.includes('Child Marriage')}
                                onChange={handleChange}
                            />
                            <label htmlFor="child-marriage">Child Marriage</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="domestic-violence" 
                                name="category" 
                                value="Domestic Violence"
                                checked={formData.category.includes('Domestic Violence')}
                                onChange={handleChange}
                            />
                            <label htmlFor="domestic-violence">Domestic Violence</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="dowry" 
                                name="category" 
                                value="Dowry"
                                checked={formData.category.includes('Dowry')}
                                onChange={handleChange}
                            />
                            <label htmlFor="dowry">Dowry</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="rehabilitation-assistance" 
                                name="category" 
                                value="Rehabilitation"
                                checked={formData.category.includes('Rehabilitation')}
                                onChange={handleChange}
                            />
                            <label htmlFor="rehabilitation-assistance">Rehabilitation Assistance</label>
                        </div>
                    </div>
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

                {/*<div className="form-group">
                    <label htmlFor="file">Choose File:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleChange}
                    />
                </div>*/}

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPlea;