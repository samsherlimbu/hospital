"use client";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Input, navbar } from "@nextui-org/react";
import Link from "next/link";
import { useFormik} from "formik";
import * as Yup from "yup";




const page = () => {

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'), 
  email: Yup.string().email('Invalid email').required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-200 shadow-lg">
      <div className="bg-slate-300 h-[70%] w-[25%] px-9 rounded-lg">
        <div className=" flex items-center justify-center py-7">
          <IoPersonOutline className="bg-white size-14 rounded-full shadow-lg" />
        </div>
        <h2 className="flex items-center justify-center font-semibold">
          Sign in your account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center mt-5 ">
            <Input
              isClearable
              type="email"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter you email"
              defaultValue="name@gmail.com"
              onClear={() => 
                formik.setFieldValue('email','')
              }
              className="max-w-xs"
            />
          </div>
          {formik.errors.email}
          
          <div className="flex items-center justify-center mt-5 ">
            <Input
              isClearable //we have to use ref hook 
              type="password"
              label="password"
              value={formik.values.password}
              name="password"
              defaultValue="Enter your password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onClear={() =>
                formik.setFieldValue('password','')
              }
              className="max-w-xs border"
            />
          </div>
          {formik.errors.password}
         
          <div className="flex items-center justify-between mt-4 ">
            <div className="flex justify-start">
              <div>
                <input type="checkbox" name="checkbox" id="remember" />
              </div>
              <div className="ml-3 ">
                <label for="remeber">Remeber me</label>
              </div>
            </div>
            <a href="#" className="text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-[70%] text-white bg-primary-600 hover:bg-primary-700 rounded-lg h-10"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
          <p className="text-sm font-light text-black dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/pages/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;