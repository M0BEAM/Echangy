import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AlertDanger from "../bootstrap/AlertDanger";
import AlertSuccess from "../bootstrap/AlertSuccess";

const Register = () => {
    const navigate = useNavigate()
    const [error,setError] = useState(null)
    const [message,setMessage] = useState("")
    const [form, setForm] = useState({
        name:"",
        email:"",
        ville:"",
        password:""
    })

    const handeleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handeleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post("http://127.0.0.1:5000/api/register",form)
            setError(false)
            setMessage("register successfully")
            setForm({name:"",email:"",ville:"",password:""})
            
        } catch (error) {
            console.log("connection failed");
            setError(true)
            setMessage(error.response.data.message)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token"))
        navigate("/home")
    },[navigate])
    return ( 
        <Container className="mt-5">
            
            <Row>
            <Col md={{size:6,offset:3}}>
                <h2>Register</h2>
               <Form  onSubmit={handeleSubmit}>
                <FormGroup>
                    <Label>Name: </Label>
                    <Input type="text" name="name" onChange={handeleChange}  value={form.name}  placeholder="username"/>
                </FormGroup>
                <FormGroup>
                    <Label>Email: </Label>
                    <Input type="email" name="email" onChange={handeleChange}  value={form.email} placeholder="email"/>
                </FormGroup>
                <FormGroup>
                    <Label>ville: </Label>
                    <Input type="text" name="ville" onChange={handeleChange}  value={form.ville} placeholder="contry"/>
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                    <Input type="password" name="password" onChange={handeleChange} value={form.password}  placeholder="Password"/>
                </FormGroup>
              <FormGroup>
              <Button className="col-md-12 text-center">Register</Button>

              </FormGroup>
                {error?(
                      <FormGroup>
                      <AlertDanger message={message}/>
                      </FormGroup>
                    ):(
                        message&&<FormGroup>
                        <AlertSuccess message={message}/>
                        </FormGroup>
                    )}
                      <p className="text-center">You already have an account. Please <a href="/login"> log in</a></p>
               </Form>
               </Col>
            </Row>
         
        </Container>
     );
}
 
export default Register;