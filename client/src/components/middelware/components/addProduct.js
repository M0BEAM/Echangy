import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AlertDanger from "../../bootstrap/AlertDanger";
import AlertSuccess from "../../bootstrap/AlertSuccess";
import ButtonLoading from "../../bootstrap/ButtonLoading";
import { ClientCtx } from "../../contexts/ClientContext";
import imageCompression from 'browser-image-compression';
import { LanguageCtx } from "../../contexts/language";
import AddDevForm from "../formValidate/addDeviceForm";

const AddProduct = () => {
   const { client } = useContext(ClientCtx)
   const [file, setFile] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState("")
   const { language } = useContext(LanguageCtx)
   const [APPURL] = useState(process.env.REACT_APP_APIURL)
   const [cloudinary] = useState({
      CLOUDINARYAPPNAME:process.env.REACT_APP_CLOUDINARYAPPNAME,
      CLOUDINARYAPPURLUP:process.env.REACT_APP_CLOUDINARYAPPURLUP
   })
   const translations = require(`../../lang/${language}.json`).addDevice;
   const [form, setForm] = useState({
      name: "",
      description: "",
      phoneNumber: "",
   })

   const handeleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
   }
   const uploadImage = async () => {
      const f = new FormData()

      const options = {
         maxSizeMB: 0.5,
         maxWidthOrHeight: 1920
      }
      try {
         const compressedFile = await imageCompression(file, options);
         //console.log(compressedFile.size/1024/1024);
         f.append("file", compressedFile)
         f.append("upload_preset", cloudinary.CLOUDINARYAPPNAME)
         const data = await axios.post(cloudinary.CLOUDINARYAPPURLUP, f)
         return data.data.secure_url
      } catch (error) {
         console.log(error);
      }
   }
   const handelePost = async (e) => {
      e.preventDefault()
      const testForm = AddDevForm (form.name,form.description,form.phoneNumber,file)
      //console.log(testForm)
      if(testForm===true){
      let imageUrl
      try {
         setLoading(true)
         //compressImage()
         imageUrl = await uploadImage()
         await axios.post(APPURL+"addProduct", { ...form, image: imageUrl, client: client._id },{
            headers:{
                "X-API-Key":process.env.REACT_APP_APIKEY
            }
        })
         setError(false)
         setLoading(false)
         setMessage("Success Post")
         setForm({ name: "", image: "", description: "", phoneNumber: "" })
      } catch (error) {
         //console.log(error.response.data.message)
         setError(true)
         setLoading(false)
         setMessage(error.response.data.message)
      }
   }
   else if(testForm === false){
      setError(true)
      setMessage("fields  is empty")
   }else{
      setError(true)
      setMessage(testForm)
   }
   }

   return (

      <Container className="mt-5 " style={{ height: "650px" }}>
          <h1 className="mt-2 text-center">{translations.title}</h1>
         <Row >
            <Col md={{ size: 6, offset: 3 }} >

               <Form onSubmit={handelePost} >
                
                  <FormGroup>
                     <Label>{translations.inputTitle[0]}</Label>
                     <Input name="name" value={form.name} onChange={handeleChange} />
                  </FormGroup>
                  <FormGroup>
                     <Label>{translations.inputTitle[1]}</Label>
                     <Input name="description" value={form.description} onChange={handeleChange} />
                  </FormGroup>
                  <FormGroup>
                     <Label>{translations.inputTitle[2]}</Label>
                     <Input name="phoneNumber" value={form.phoneNumber} onChange={handeleChange} />
                  </FormGroup>
                  <FormGroup>
                     <Label>{translations.inputTitle[3]}</Label>
                     <Input type="file" value={form.image} onChange={(e) => { setFile(e.target.files[0]) }} />
                  </FormGroup>

                  <FormGroup class="col-md-12 text-center">
                     {
                        loading ? <ButtonLoading /> :
                           <Button color="primary" >{translations.button}</Button>
                     }
                  </FormGroup>

                  <FormGroup class="mt-3">
                     {error ? (
                        <AlertDanger message={message} />
                     ) :
                        (
                           message && <AlertSuccess message={message} />
                        )
                     }
                  </FormGroup>

               </Form>

            </Col>
         </Row>
      </Container>

   );
}

export default AddProduct;



const convertToBase64 = (file) => {

   return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = () => {
         resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
         reject(fileReader.result)
      }
      fileReader.readAsDataURL(file)
   })

}