import React, { useState } from "react";

export default function Form() {
    const [error, setError] = useState([]);

    const [form, setForm] = useState({
        name: "",
        usia: 0,
        tahunLahir: 0,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        setError([]);
        setForm({
            ...form,
            usia: 2022 - form.tahunLahir,
        });

        if (form.name === "") {
            setError((error) => [...error, "nama tidak boleh kosong"]);
        }

        if (form.name.length < 3) {
            setError((error) => [...error, "nama harus minimal 3 karakter"]);
        }
    };

    return (
        <>
            Nama:{" "}
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
            />
            <br />
            Tahun Lahir:{" "}
            <input
                type="number"
                name="tahunLahir"
                value={form.tahunLahir}
                onChange={handleChange}
            />
            <br />
            Nama saya : {form.name}
            <br />
            Tahun Lahir saya : {form.tahunLahir}
            <br />
            Usia saya adalah : {form.usia} tahun
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <ul>
                {error &&
                    error.map((err, index) => {
                        return <li key={index}>{err}</li>;
                    })}
            </ul>
        </>
    );
}
