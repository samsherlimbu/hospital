"use client";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .max(50, 'Password is too long - should be 50 chars maximum.')
      .required('Password is required'), 
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      loginUser(values)
    },
  });
  const loginUser = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    const response = await fetch('http://localhost:8000/login', requestOptions);
    const data = await response.json();
    if(response.status == '200'){
      toast.success(data.message);
      router.push('/')
    }else{
      toast.error(data.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-200 shadow-lg">
      <div className="bg-slate-300 h-auto w-[90%] sm:w-[50%] md:w-[35%] lg:w-[25%] p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center py-7">
          <IoPersonOutline className="bg-white size-14 rounded-full shadow-lg text-5xl p-2" />
        </div>
        <h2 className="flex items-center justify-center font-semibold text-xl mb-4">
          Sign in to your account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <Input
              isClearable
              type="email"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              onClear={() => formik.setFieldValue('email', '')}
              className="w-full"
              status={formik.errors.email && formik.touched.email ? 'error' : 'default'}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>
          
          <div className="mb-5">
            <Input
              isClearable
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              onClear={() => formik.setFieldValue('password', '')}
              className="w-full"
              status={formik.errors.password && formik.touched.password ? 'error' : 'default'}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>
         
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="remember" id="remember" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-900">Remember me</span>
            </label>
            <Link href="#" className="text-primary-600 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-lg h-10 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Don’t have an account yet?{" "}
              <Link
                href="/pages/register"
                className="font-medium text-primary-600 hover:underline"
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

export default Page;
