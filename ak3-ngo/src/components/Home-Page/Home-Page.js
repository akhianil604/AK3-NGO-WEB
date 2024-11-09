import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../login.css";
const HomePage = ()=>{

    const [activeSection, setActiveSection] = useState('home');

    const [pleaData, setPleaData] = useState({
        name: '',
        gender: '',
        DOB: '',
        email: '',
        phone: '',
        education: '',
        maritalStatus: '',
        address: '',
        city: '',
        state: '',
        categories: [],
        plea: '',
        description: '',
    }) 

    const handlePleaChange = (e) => {
        const { name, value } = e.target;
        if(name === "categories"){
            setPleaData(prevState => ({
                ...prevState,
                [name]: [...prevState[name], value]
            }));
        }
        else{
            setPleaData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handlePleaSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for submitting your plea! We will review it and get back to you soon.');
        //Add api here for submit
        
        // Reset form state after submission
        setPleaData({
            name: '',
            gender: '',
            DOB: '',
            email: '',
            phone: '',
            education: '',
            maritalStatus: '',
            address: '',
            city: '',
            state: '',
            categories: [],
            plea: '',
            description: '',
        });
    };

    const [userData, setUserData] = useState({
        name: '',
        gender: '',
        DOB: '',
        email: '',
        phone: '',
        education: '',
        maritalStatus: '',
        address: '',
        city: '',
        state: '',
        password: ''
    }) 

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        if(name === "categories"){
            setUserData(prevState => ({
                ...prevState,
                [name]: [...prevState[name], value]
            }));
        }
        else{
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    //Add handleUserDataSubmit with API
    const handleUserDataSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),  // Send user data as JSON
            });
    
            // Check if the response is okay
            if (!response.ok) {
                const errorText = await response.text();  // Get response text if there's an error
                throw new Error(errorText);
            }
    
            const result = await response.json();  // Parse the JSON response
            console.log('Success:', result);
        } catch (error) {
            console.error('Error during the API request:', error);
        }
    };
    

    useEffect(() => {
        // Function to reveal sections on scroll
        const reveals = document.querySelectorAll('.reveal');
    
        const revealOnScroll = () => {
          const windowHeight = window.innerHeight;
          const revealPoint = 150; // Adjust this value to control when the section becomes visible
    
          reveals.forEach(reveal => {
            const sectionTop = reveal.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
              reveal.classList.add('active');
            } else {
              reveal.classList.remove('active');
            }
          });
        };
    
        // Add scroll event listener
        window.addEventListener('scroll', revealOnScroll);
    
        // Initial check in case sections are already in view
        revealOnScroll();
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', revealOnScroll);
        };
      }, []);

    return(
        <div className="homePage">
            <nav>
                <h1 class="logo">(AK)<sup>3</sup>'s NGO</h1>
                <ul class="center-links">
                    <li><button onClick={() => setActiveSection('home')}>Home Page</button></li>
                    <li><button onClick={() => setActiveSection('about-us')}>About Us</button></li>
                    <li><button onClick={() => setActiveSection('contact-us')}>Contact Us</button></li>
                    <li><button onClick={() => setActiveSection('register-plea')}>Register Plea</button></li>
                    <li><button onClick={() => setActiveSection('donate')}>Donate</button></li>
                </ul>
                <ul class="right-links">
                    <li><button onClick={() => setActiveSection('login')}>Login</button></li>
                    <li><button onClick={() => setActiveSection('user-signup')}>User Signup</button></li>
                </ul>
            </nav>

            <section id="home" className={activeSection === 'home' ? 'page active' : 'page hidden'}>
                <header>
                    <h1 class="main-title">(AK)<sup>3</sup>: NGO for Women and Children</h1>
                    <p class="subtitle">Empowering assistance through information outreach</p>
                </header>
            
                <section id="stakeholders" className="reveal">
                    <h2 class="section-title">Participation of Stakeholders</h2>
                    <div class="stakeholder-cards">
                        <div class="card">
                            <img src="Connections.png" alt="We, AK3" class="icon"/>
                            <h3>WE, (AK)<sup>3</sup></h3>
                            <p>Resolve Pleas by ourselves & Delegate applications to Sister-NGOs/Police</p>
                        </div>
                        <div class="card">
                            <img src="Ngo.png" alt="Sister NGOs" class="icon"/>
                            <h3>SISTER-NGO's</h3>
                            <p>Resolve Pleas within their jurisdiction</p>
                        </div>
                        <div class="card">
                            <img src="Police.png" alt="Police" class="icon"/>
                            <h3>POLICE</h3>
                            <p>Acquire Pleas, forwarded by us, AK<sup>3</sup>, for serious legal implications, to proceed enquiries/investigations</p>
                        </div>
                        <div class="card">
                            <img src="Profile.png" alt="User" class="icon"/>
                            <h3>USER</h3>
                            <p>File pleas on behalf of themselves/victim. Track applications to view status</p>
                        </div>
                    </div>
                </section>
            
                <section id="support" class="reveal">
                    <h2 class="section-title">Support the Cause</h2>
                    <div class="support-text">
                        <p>In today’s society, atrocities against women and children are increasing substantially. We acknowledge the fact of a large percentage of people not seeking help. Support the cause by a small donation, to assist us in continuing our operations.</p>
                    </div>
                </section>
            </section>
            
            <section id="about-us" className={activeSection === 'about-us' ? 'page active' : 'page hidden'}>
                <h4 class="abtus1">(AK)<sup>3</sup>'s NGO: Empowering Women and Children</h4>
                <p class="abtus2">In a society where atrocities against women and children are alarmingly prevalent, (AK)<sup>3</sup>'s NGO is dedicated to championing the rights and well-being of these vulnerable groups. We firmly believe that a robust system of information transfer and outreach can empower individuals to seek assistance and access the resources they need, whether for legal or non-legal support.</p>
                <p class="abtus3">Our mission is to create a safe haven for women and children, offering immediate assistance and comprehensive support in times of crisis. We are committed to fostering a community where every individual feels heard, valued, and empowered to reclaim their lives. We aim to assist these distressed individuals through:</p>
                <ul class="abtus-subparts">
                    <li class="abtus-subparts-item"><strong>Immediate Support and Care:</strong> Upon reaching out, victims will be welcomed into our supportive environment, where they can find solace and reassurance. Our dedicated team of trained professionals provides compassionate care, psychological support, and guidance tailored to each individual’s needs.</li>
                    <li class="abtus-subparts-item"><strong>Referral to Partner NGOs:</strong> We recognize that collaboration is essential for effective support. Through our extensive network of sister NGOs, we can connect individuals with additional resources and services, including counseling, shelter, medical assistance, and vocational training. These organizations share our values and commitment to uplifting women and children, ensuring a seamless continuum of care.</li>
                    <li class="abtus-subparts-item"><strong>Engagement with Law Enforcement:</strong> In situations where the gravity of the situation demands immediate action, we will not hesitate to involve law enforcement. Our NGO is dedicated to advocating for the rights of victims, ensuring that their pleas are heard and acted upon. We work closely with police and legal authorities to facilitate investigations and ensure justice is served.</li>
                    <li class="abtus-subparts-item"><strong>Community Outreach and Education:</strong> We aim to educate the community about the issues facing women and children, promoting awareness and understanding. Through workshops, seminars, and outreach programs, we strive to empower individuals with knowledge about their rights and available resources. Our goal is to create a culture of support and solidarity, breaking down barriers that prevent individuals from seeking help.</li>
                    <li class="abtus-subparts-item"><strong>Creating a Safe Network:</strong> We are committed to establishing a safe network for women and children, where they can find solace and security. This includes creating safe spaces for discussion, support groups, and community events that foster connection and resilience among individuals who have faced similar challenges.</li>
                </ul>
            </section>
            
            <section id="contact-us" class={activeSection === 'contact-us' ? 'page active' : 'page hidden'}>
                <p class="contact-info">
                    At (AK)<sup>3</sup>'s NGO, we value open communication and are here to assist you. Whether you’re seeking help, have questions about our services, or want to collaborate with us, we encourage you to reach out. Your inquiries are important to us, and we are committed to responding promptly.
                </p>
                
                <h4>Get in Touch</h4>
                <p class="contact-info">You can contact us through the following channels:</p>
                
                <ul class="contact-details">
                    <li class="contact-details-item"><strong>Email Us:</strong></li>
                    <li class="contact-details-item">For general inquiries or information about our services, please reach out to us at: <a href="mailto:abc@gmail.com">abc@gmail.com</a></li>
                    <li class="contact-details-item">For specific questions or assistance related to legal support or outreach, feel free to contact: <a href="mailto:def@gmail.com">def@gmail.com</a></li>
                    
                    <li class="contact-details-item"><strong>Call Us:</strong></li>
                    <li class="contact-details-item">For immediate assistance or if you prefer to speak with someone directly, call us at: <a href="tel:+1234567891">123-456-7891</a></li>
                    <li class="contact-details-item">Alternatively, you can reach out to our dedicated helpline for urgent matters: <a href="tel:+2345678912">234-567-8912</a></li>
                    
                    <li class="contact-details-item"><strong>Visit Us:</strong></li>
                    <li class="contact-details-item">We invite you to visit our office to discuss your concerns in person. Our doors are always open, and we are here to help.</li>
                    <li class="contact-details-item"><strong>Office Address:</strong> [Your Office Address Here], [City, State, Zip Code]</li>
                    <li class="contact-details-item"><strong>Office Hours:</strong></li>
                    <li class="contact-details-item">Monday to Friday: 9 AM - 5 PM</li>
                    <li class="contact-details-item">Saturday: 10 AM - 3 PM</li>
                    <li class="contact-details-item">Sunday: Closed</li>
                    
                    <li class="contact-details-item"><strong>Follow Us on Social Media:</strong></li>
                    <li class="contact-details-item">Stay connected with us and keep up to date with our initiatives, events, and resources by following us on social media:</li>
                    <li class="contact-details-item">Facebook: <a href="[Your Facebook Page Link]">[Your Facebook Page Link]</a></li>
                    <li class="contact-details-item">Twitter: <a href="[Your Twitter Handle]">[Your Twitter Handle]</a></li>
                    <li class="contact-details-item">Instagram: <a href="[Your Instagram Handle]">[Your Instagram Handle]</a></li>
                    <li class="contact-details-item">LinkedIn: <a href="[Your LinkedIn Profile]">[Your LinkedIn Profile]</a></li>
                </ul>
                
                <h4>Share Your Thoughts</h4>
                <p class="contact-info">
                    We appreciate your feedback and suggestions. If you have ideas on how we can improve our services or better support our community, please let us know. Your insights help us grow and serve more effectively.
                </p>
                
                <h4>Confidentiality</h4>
                <p class="contact-info">
                    If you are reaching out for support or assistance, please know that your privacy and confidentiality are our top priorities. We are committed to creating a safe space where you can express your concerns without fear of judgment or disclosure.
                </p>
                
                <p class="contact-info">
                    Thank you for your interest in (AK)<sup>3</sup>'s NGO. We look forward to hearing from you!
                </p>
            </section>
            

            <section id="register-plea" class={activeSection === 'register-plea' ? 'page active' : 'page hidden'}>
                <h2>Register Your Plea</h2>
                <form class="plea-form">
                    <div class="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Name" required
                            value={pleaData.name}
                            onChange={handlePleaChange}/>
                    </div>

                    <label>Gender:</label>
                        <div class="form-group"> 
                            <div>
                                <input type="radio" id="male" name="gender" value="male"
                                    checked={pleaData.gender === 'male'}
                                    onChange={handlePleaChange}/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="female"
                                    checked={pleaData.gender === 'female'}
                                    onChange={handlePleaChange}/>
                                <label htmlFor="female">Female</label>
                            </div>
                            <div>
                                <input type="radio" id="others" name="gender" value="other"
                                    checked={pleaData.gender === 'other'}
                                    onChange={handlePleaChange}/>
                                <label htmlFor="others">Others</label>
                            </div>
                        </div>

                        <div className="form-group">
                    <label htmlFor="DOB">Date of Birth:</label>
                        <input 
                            type="date" 
                            id="DOB" 
                            name="DOB" 
                            required
                            value={pleaData.DOB}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="abc@gmail.com" 
                            required
                            value={pleaData.email}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            pattern="[0-9]{10}" 
                            placeholder="10 digits" 
                            required
                            value={pleaData.phone}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <label htmlFor="education">Educational Qualifications:</label>
                    <div className="form-group">
                        <select 
                            id="education" 
                            name="education" 
                            value={pleaData.education}
                            onChange={handlePleaChange}
                        >
                            <option value="" disabled>Select your qualification</option>
                            <option value="schooling-not-completed">Schooling Not Completed</option>
                            <option value="10th-pass">10th Grade Pass</option>
                            <option value="12th-pass">12th Grade Pass</option>
                            <option value="diploma">Diploma</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="graduate-postgraduate">Graduate/Postgraduate</option>
                        </select>
                    </div>

                    <label>Marital Status:</label>
                    <div className="form-group"> 
                        <div>
                            <input 
                                type="radio" 
                                id="minor" 
                                name="maritalStatus" 
                                value="Minor"
                                checked={pleaData.maritalStatus === 'Minor'}
                                onChange={handlePleaChange}
                            />
                            <label htmlFor="minor">Minor</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="unmarried" 
                                name="maritalStatus" 
                                value="Unmarried"
                                checked={pleaData.maritalStatus === 'Unmarried'}
                                onChange={handlePleaChange}
                            />
                            <label htmlFor="unmarried">Unmarried</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="married" 
                                name="maritalStatus" 
                                value="Married"
                                checked={pleaData.maritalStatus === 'Married'}
                                onChange={handlePleaChange}
                            />
                            <label htmlFor="married">Married</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea 
                            id="address" 
                            name="address" 
                            placeholder="Address" 
                            rows="5" 
                            cols="30" 
                            required
                            value={pleaData.address}
                            onChange={handlePleaChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            placeholder="City" 
                            required
                            value={pleaData.city}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input 
                            type="text" 
                            id="state" 
                            name="state" 
                            placeholder="State" 
                            required
                            value={pleaData.state}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select the Categories:</label>
                        <div className="checkbox-group">
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="harassment" 
                                    name="category" 
                                    value="harassment"
                                    checked={pleaData.categories.includes('harassment')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="harassment">Harassment</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="forced-labour" 
                                    name="category" 
                                    value="forced-labour"
                                    checked={pleaData.categories.includes('forced-labour')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="forced-labour">Forced Labour</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="human-trafficking" 
                                    name="category" 
                                    value="human-trafficking"
                                    checked={pleaData.categories.includes('human-trafficking')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="human-trafficking">Human Trafficking</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="child-marriage" 
                                    name="category" 
                                    value="child-marriage"
                                    checked={pleaData.categories.includes('child-marriage')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="child-marriage">Child Marriage</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="domestic-violence" 
                                    name="category" 
                                    value="domestic-violence"
                                    checked={pleaData.categories.includes('domestic-violence')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="domestic-violence">Domestic Violence</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="dowry" 
                                    name="category" 
                                    value="dowry"
                                    checked={pleaData.categories.includes('dowry')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="dowry">Dowry</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="rehabilitation-assistance" 
                                    name="category" 
                                    value="rehabilitation-assistance"
                                    checked={pleaData.categories.includes('rehabilitation-assistance')}
                                    onChange={handlePleaChange}
                                />
                                <label htmlFor="rehabilitation-assistance">Rehabilitation Assistance</label>
                            </div>
                        </div>
                    </div>            

                    <div className="form-group">
                        <label htmlFor="plea">What is the plea?</label>
                        <input 
                            type="text" 
                            id="plea" 
                            name="plea" 
                            placeholder="Plea in 2-3 words" 
                            required
                            value={pleaData.plea}
                            onChange={handlePleaChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of the plea:</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            placeholder="Detailed Description of the Plea" 
                            rows="5" 
                            required
                            value={pleaData.description}
                            onChange={handlePleaChange}
                        ></textarea>
                    </div>

                    {/* Need to handle files */}
                    {/* <div className="form-group">
                        <label htmlFor="files">Submit any files:</label>
                        <input 
                            type="file" 
                            id="files" 
                            name="files" 
                            multiple
                        />
                    </div> */}

                    <div className="form-group">
                        <button type="submit" className="submit-btn" onClick={handlePleaSubmit}>Submit</button>
                    </div>
                </form>
            </section>

            <section id="donate" class={activeSection === 'donate' ? 'page active' : 'page hidden'}>
                <div class="donate stuff">
                    <h2>Donate to (AK)<sup>3</sup>'s NGO</h2>
                    <p>Scan and donate through Google Pay:</p>
                    <div id="container"></div> {/* <!-- Google Pay button will appear here --> */}
                </div>
            </section>
            
            
            <section id="login" class={activeSection === 'login' ? 'page active' : 'page hidden'}>
                <div class="top-section">
                    <div class="sister-portal">
                        <h2>Sister Portal</h2>
                        <img src="Ngo.png" alt="Sister NGOs" class="icon"/>
                        <br/>
                        <Link to="/sister-ngo/login" className="back-btn">
                            <button class="login-btn">Login</button>
                        </Link>
                        
                    </div>
                    <div class="police-portal">
                        <h2>Police Portal</h2>
                        <img src="Police.png" alt="Police" class="icon"/>
                        <br/>
                        {/* <button class="login-btn" onclick="navigateToPortal('police')">Login</button> */}
                        <Link to="/police/login" className="back-btn">
                            <button class="login-btn">Login</button>
                        </Link>
                    </div>
                </div>
                <div class="bottom-section">
                    <h2>User Portal</h2>
                    <img src="Profile.png" alt="User" class="icon"/>
                    <br/>
                    {/* <button class="login-btn" onclick="navigateToPortal('user')">Login</button> */}
                    <Link to="/user/login" className="back-btn">
                        <button class="login-btn">Login</button>
                    </Link>
                </div>
            </section>
            
            
            <section id="user-signup" class={activeSection === 'user-signup' ? 'page active' : 'page hidden'}>
                <form class="login-form">
                    <div class="user-signup1">
                        <p>User Signup</p>
                    </div>

                    {/* <!-- <div class="user-signup2">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required/>
                    </div> --> */}
                    
                    <div class="user-signup2">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Name" required
                            value={userData.name}
                            onChange={handleUserDataChange}/>
                    </div>

                    <label>Gender:</label>
                        <div class="user-signup2"> {/* <!--user-signup2-g--> */}
                            <div>
                                <input type="radio" id="male" name="gender" value="male"
                                    checked={userData.gender === "male"}
                                    onChange={handleUserDataChange}/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="female"
                                    checked={userData.gender === "female"}
                                    onChange={handleUserDataChange}/>
                                <label htmlFor="female">Female</label>
                            </div>
                            <div>
                                <input type="radio" id="others" name="gender" value="other"
                                    checked={userData.gender === "other"}
                                    onChange={handleUserDataChange}/>
                                <label htmlFor="others">Others</label>
                            </div>
                        </div>

                    <div class="user-signup2">
                        <label htmlFor="DOB">Date of Birth:</label>
                        <input type="date" id="DOB" name="DOB" required
                            value={userData.DOB}
                            onChange={handleUserDataChange}/>
                    </div>

                    <div class="user-signup2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="abc@gmail.com" required
                            value={userData.email}
                            onChange={handleUserDataChange}/>
                    </div>

                    <div class="user-signup2">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="10 digits" required
                            value={userData.phone}
                            onChange={handleUserDataChange}/>
                    </div>

                    <label htmlFor="education">Educational Qualifications:</label>
                    <div class="user-signup2">
                        <select id="education" name="education"
                            value={userData.education}
                            onChange={handleUserDataChange}>

                            <option value="" disabled selected>Select your qualification</option>
                            <option value="school">Schooling Not Completed</option>
                            <option value="10thpass">10th Grade Pass</option>
                            <option value="12thpass">12th Grade Pass</option>
                            <option value="diploma">Diploma</option>
                            <option value="undergrad">Undergraduate</option>
                            <option value="postgrad">Graduate/Postgraduate</option>
                        </select>
                    </div>

                    <label>Marital Status:</label>
                        <div class="user-signup2"> 
                            <div>
                                <input type="radio" id="minor" name="maritalStatus" value="minor"
                                    onChange={handleUserDataChange}
                                    checked={userData.maritalStatus === "minor"}/>
                                <label htmlFor="minor">Minor</label>
                            </div>
                            <div>
                                <input type="radio" id="unmarried" name="maritalStatus" value="unmarried"
                                    onChange={handleUserDataChange}
                                    checked={userData.maritalStatus === 'unmarried'}/>
                                <label htmlFor="unmarried">Unmarried</label>
                            </div>
                            <div>
                                <input type="radio" id="married" name="maritalStatus" value="married"
                                    onChange={handleUserDataChange}
                                    checked={userData.maritalStatus === 'married'}/>
                                <label htmlFor="married">Married</label>
                            </div>
                        </div>

                    <div class="user-signup2">
                        <label htmlFor="address">Address:</label>
                        <textarea id="address" name="address" placeholder="Address" rows="5" cols="30" required
                            value={userData.address}
                            onChange={handleUserDataChange}>
                        </textarea>
                    </div>

                    <div class="user-signup2">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" placeholder="City" required
                            value={userData.city}
                            onChange={handleUserDataChange}/>
                    </div>

                    <div class="user-signup2">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" placeholder="State" required
                            value={userData.state}
                            onChange={handleUserDataChange}/>
                    </div>

                    <div class="user-signup2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required
                            value={userData.password}
                            onChange={handleUserDataChange}/>
                    </div>
                    
                    <button type="submit" class="login-btn" onClick={handleUserDataSubmit}>Login</button>
                    
                    
                </form>
            </section>
        </div>
    );
}

export default HomePage;