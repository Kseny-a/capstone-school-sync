
import { Form, FormField, Button } from 'semantic-ui-react'; 

function LoginForm() {
  return (
    <Form>
    <FormField>
      <label>Email</label>
      <input placeholder='Email' />
    </FormField>
    <FormField>
      <label>Password</label>
      <input placeholder='Password' />
    </FormField>
    <Button type='submit'>Submit</Button>
  </Form>
  )
}

export default LoginForm;