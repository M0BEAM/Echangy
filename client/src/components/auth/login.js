import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AlertDanger from "../bootstrap/AlertDanger";
import AlertSuccess from "../bootstrap/AlertSuccess";
import UseLogin from "../hooks/FetchLogin";


const Login = () => {
    const [error,setError] = useState(null)
    const [message,setMessage] = useState("")
    const [form, setForm] = useState({
        email:"",
        password:""
    })

    const login = UseLogin()
    const handeleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handeleSubmit = async (e) => {
        e.preventDefault()
        try {
          await login(form.email,form.password)
          setError(false)
          setMessage("login successfully")
      
            //navigate("/home")
        } catch (error) {
            console.log(error.response.data.message);
            setError(true)
            setMessage(error.response.data.message)
        }
    }
  /*
    useEffect(()=>{
        if(localStorage.getItem("token"))
        navigate("/home")
    },[])
  */
    return ( 
        <Container className="mt-5">
            
            <Row  >
            
            <Col md={{size:6,offset:3}}>
            <h2>Login</h2>    
         
               <Form  onSubmit={handeleSubmit}>

                <FormGroup>
                    <Label>Email: </Label>
                    <Input type="email" name="email" onChange={handeleChange}  placeholder="email"/>
                </FormGroup>
        
                <FormGroup>
                    <Label>Password: </Label>
                    <Input type="password" name="password" onChange={handeleChange}  placeholder="Password"/>
                </FormGroup>
                <FormGroup>
                <Button className="col-md-12 text-center">Login</Button>
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
                    <p className="text-center">you don't have an account, <a href="/register">Register</a></p>
               </Form>
               </Col>
            </Row>
         
        </Container>
     );
}
 
export default Login;