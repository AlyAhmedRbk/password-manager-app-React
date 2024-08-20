import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordsArray, setPasswordsArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordsArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text";
        }
    }

    const savePassword = () => {
        setPasswordsArray([...passwordsArray, {...form, id : uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id : uuidv4()}]))
        toast("✔️ Password Saved Sucessfully!");
        form.site="";
        form.username="";
        form.password="";

    }

    const deletePassword = (id) => {
        // console.log("Deleting Password with id ", id);
        setPasswordsArray(passwordsArray.filter((item)=>item.id!==id));
        localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter((item)=>item.id!==id)));
        toast("❌ Password Deleted Successfully!");
    }

    const editPassword = (id) => {
        // console.log("Editing Password with id ", id);
        setForm(passwordsArray.filter(i=>i.id===id)[0]);
        setPasswordsArray(passwordsArray.filter((item)=>item.id!==id));
    }

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div className='bg-slate-700 min-h-screen py-5'>
                <div className="logo flex items-center justify-center flex-col pt-5 gap-2 text-white text-2xl">
                    <h2 className='font-bold'>
                        <span className='text-green-600'>&lt;</span>
                        Pass
                        <span className='text-green-600'>OP/&gt;</span>
                    </h2>
                    <p className='text-sm ml-10'>Your own password manager app</p>
                </div>
                <div className="flex flex-col gap-5 items-center pt-5 mt-5">
                    <input className='w-1/4 px-4 rounded h-8 ' type="email" value={form.site} placeholder='Your webiste Url'
                        onChange={handleChange}
                        name='site'
                    />
                    <input className='w-1/4 px-4 rounded h-8 ' type="text" value={form.username} placeholder='Enter your Name'
                        onChange={handleChange}
                        name='username'
                    />
                    <div className="relative flex justify-center items-center">
                        <input className='w-[380px] px-4 rounded h-8' type="password" value={form.password} placeholder='Enter your Password'
                            onChange={handleChange}
                            name='password'
                            ref={passwordRef}
                        />
                        <span className='absolute right-0 mr-3 hover:cursor-pointer' onClick={showPassword}>
                            <img ref={ref} width={20} src={"./public/icons/eye.png"} alt="" />
                        </span>
                    </div>
                    <button
                        className='bg-green-800 text-white px-8 rounded py-2 hover:bg-green-700 font-bold'
                        onClick={savePassword}>
                        Save</button>
                </div>
                <hr className='w-[50%] m-auto my-5' />
                {/* Displaying your passwords */}
                <div className="passwords flex justify-center items-center flex-col gap-5 mt-5 text-white">
                    <h2 className='text-2xl font-bold font-mono'>Your Passwords</h2>
                    {passwordsArray.length === 0 &&
                        <div className='text-white text-sm'>
                            No passwords to show
                        </div>}

                    {passwordsArray.length !== 0 && <table className="table-auto w-[60vw] text-center">
                        <thead className='bg-green-800'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-800'>
                            {passwordsArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='py-2'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-2'>{item.username}</td>
                                        <td className='py-2'>{"*".repeat(item.password.length)}</td>
                                        <td className='py-2 flex justify-center items-center'>
                                            <span className='bg-green-600 px-3 py-1 rounded-2xl cursor-pointer'  onClick={()=>{editPassword(item.id)}}>Edit</span>
                                            <span className='bg-red-600 mx-2 px-2 py-1 rounded-2xl cursor-pointer' onClick={()=>{deletePassword(item.id)}}>Delete</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
