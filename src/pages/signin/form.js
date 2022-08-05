import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

function SForm({ form, handleChange, handleSubmit, isLoading }) {
    return (
        <Form>
            <TextInputWithLabel
                placeholder="Masukkan email"
                label="Email"
                name="email"
                value={form?.email}
                type="email"
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder="Masukkan Password"
                label="Password"
                name="password"
                value={form?.password}
                type="password"
                onChange={handleChange}
            />
            <SButton
                loading={isLoading}
                disabled={isLoading}
                variant="primary"
                action={handleSubmit}>
                Submit
            </SButton>
        </Form>
    );
}

export default SForm;
