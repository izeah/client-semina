import React from "react";
import {
    Card,
    CloseButton,
    Col,
    Figure,
    Form,
    FormControl,
    InputGroup,
    Row,
} from "react-bootstrap";
import SButton from "../../components/Button";
import SelectBox from "../../components/SelectBox";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { seminaImageUrl } from "../../config";

function SForm({
    statusTicketCategoryOptions,
    handleSubmit,
    form,
    handleChange,
    isLoading,
    edit,
    lists,
    handlePlusKeyPoint,
    handleChangeKeyPoint,
    handleMinusKeyPoint,
    handlePlusTicket,
    handleMinusTicket,
    handleChangeTicket,
}) {
    return (
        <Form className="mb-2">
            <Row>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan judul"}
                        label={"Judul"}
                        name="title"
                        value={form.title}
                        type="text"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan tagline"}
                        label={"Tagline"}
                        name="tagline"
                        value={form.tagline}
                        type="text"
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan tanggal acara"}
                        label={"Tanggal"}
                        name="date"
                        value={form.date}
                        type="datetime-local"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <SelectBox
                        label={"Category"}
                        placeholder={"Masukan kategori"}
                        name="category"
                        value={form.category}
                        options={lists.categories}
                        isClearable={true}
                        handleChange={(e) => handleChange(e)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan about"}
                        label={"About"}
                        name="about"
                        value={form.about}
                        type="text"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan tempat acara"}
                        label={"Tempat acara"}
                        name="venueName"
                        value={form.venueName}
                        type="text"
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            {/* keypoint */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Key Point</Card.Title>
                    <Row>
                        {form.keypoint.map((key, index) => (
                            <Col md={6} key={index}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Masukan keypoint"
                                        value={key}
                                        type="text"
                                        name="key"
                                        onChange={(e) => {
                                            handleChangeKeyPoint(e, index);
                                        }}
                                    />
                                    {index !== 0 && (
                                        <InputGroup.Text id="basic-addon2">
                                            <CloseButton
                                                onClick={() =>
                                                    handleMinusKeyPoint(index)
                                                }
                                            />
                                        </InputGroup.Text>
                                    )}
                                </InputGroup>
                            </Col>
                        ))}
                    </Row>
                    <SButton
                        variant="success"
                        action={handlePlusKeyPoint}
                        size="sm">
                        Tambah keypoint
                    </SButton>
                </Card.Body>
            </Card>

            <Row>
                <Col>
                    <SelectBox
                        label={"Pembicara"}
                        placeholder={"Masukan pembicara"}
                        name="talent"
                        value={form.talent}
                        options={lists.talents}
                        isClearable={true}
                        handleChange={(e) => handleChange(e)}
                    />
                </Col>
                <Col>
                    <TextInputWithLabel
                        placeholder={"Masukan Avatar"}
                        label={"Cover"}
                        name="avatar"
                        type="file"
                        onChange={handleChange}
                    />
                    {form.avatar !== "" && (
                        <div>
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={`${seminaImageUrl}/${form.avatar}`}
                                />

                                <Figure.Caption>
                                    Perview image cover
                                </Figure.Caption>
                            </Figure>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Tickets */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Tiket</Card.Title>
                    {form.tickets.map((tic, index) => (
                        <Row key={index}>
                            <Col md={4}>
                                <TextInputWithLabel
                                    placeholder={"Masukan tipe tiket"}
                                    label={"Tipe"}
                                    name="type"
                                    value={tic.type}
                                    type="text"
                                    onChange={(e) =>
                                        handleChangeTicket(e, index)
                                    }
                                />
                            </Col>
                            <Col md={4}>
                                <TextInputWithLabel
                                    placeholder={"Masukan Harga"}
                                    label={"Harga"}
                                    name="price"
                                    value={tic.price}
                                    type="number"
                                    onChange={(e) =>
                                        handleChangeTicket(e, index)
                                    }
                                />
                            </Col>
                            <Col md={4}>
                                <TextInputWithLabel
                                    placeholder={"Masukan stok tiket"}
                                    label={"Stock"}
                                    name="stock"
                                    value={tic.stock}
                                    type="number"
                                    onChange={(e) =>
                                        handleChangeTicket(e, index)
                                    }
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Status</Form.Label>
                                <SelectBox
                                    placeholder="Masukan status"
                                    name="statusTicketCategory"
                                    value={tic.statusTicketCategory}
                                    options={statusTicketCategoryOptions}
                                    isClearable={true}
                                    handleChange={(e) =>
                                        handleChangeTicket(e, index)
                                    }
                                />
                            </Col>
                            <Col md={index !== 0 ? 5 : 6}>
                                <TextInputWithLabel
                                    placeholder={"Masukan tanggal expired"}
                                    label={"Expired Date"}
                                    name="expiredAt"
                                    value={tic.expiredAt}
                                    type="date"
                                    onChange={(e) =>
                                        handleChangeTicket(e, index)
                                    }
                                />
                            </Col>
                            {index !== 0 && (
                                <Col
                                    md={1}
                                    className="d-flex justify-content-end align-items-center">
                                    <CloseButton
                                        onClick={() => handleMinusTicket(index)}
                                    />
                                </Col>
                            )}
                        </Row>
                    ))}
                    <div className="mb-3">
                        <SButton
                            variant="success"
                            action={handlePlusTicket}
                            size="sm">
                            Tambah Ticket
                        </SButton>
                    </div>
                </Card.Body>
            </Card>

            <div className="d-grid">
                <SButton
                    variant="primary"
                    action={handleSubmit}
                    loading={isLoading}>
                    {edit ? "Ubah" : "Simpan"}
                </SButton>
            </div>
        </Form>
    );
}

export default SForm;
