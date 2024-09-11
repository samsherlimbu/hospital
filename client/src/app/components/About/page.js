'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/page';
import Footer from '../footer/page';

const About = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [groupedData, setGroupedData] = useState({});
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMessage = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}getAboutMessage`);
                const responseInfo = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}AboutInfo`);
                
                const combinedData = [
                    ...responseMessage.data.data.filter(item => item.aboutText),
                    ...responseInfo.data.data.filter(item => item.post && item._id)
                ];

                setAboutData(combinedData);

                // Grouping data by post
                const grouped = combinedData.reduce((acc, item) => {
                    if (item.post) {
                        if (!acc[item.post]) {
                            acc[item.post] = [];
                        }
                        if (item.name) {
                            acc[item.post].push(item.name);
                        }
                    }
                    return acc;
                }, {});

                setGroupedData(grouped);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleItem = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const formatText = (text) => {
        const safeText = text || '';
        return safeText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='container mx-auto px-4 py-12'>
                <div className='bg-slate-300 shadow-2xl rounded-lg overflow-hidden'>
                    <div className='p-8'>
                        <h1 className='text-5xl font-extrabold text-gray-900 mb-8 text-center'>About Us</h1>
                        {aboutData.some(item => item.aboutText) ? (
                            aboutData.map((item, index) => (
                                item.aboutText && (
                                    <p key={index} className='text-lg text-black mb-6'>
                                        {formatText(item.aboutText)}
                                    </p>
                                )
                            ))
                        ) : (
                            <p className='text-lg text-gray-600'>No about message available.</p>
                        )}
                    </div>
                </div>
                <div className='bg-gray-200 p-8 mt-8 shadow-lg rounded-lg'>
                    <h1 className='text-5xl font-extrabold text-orange-600 text-center mb-8'>
                        BOARD OF DIRECTORS
                    </h1>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((post, index) => (
                            <div key={post} className="mb-6">
                                <div
                                    className="bg-blue-600 text-white p-5 cursor-pointer hover:bg-blue-700 transition-colors duration-300 rounded-lg"
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    <h2 className="text-2xl font-semibold text-center">{post}</h2>
                                </div>
                                {activeIndex === index && (
                                    <div className="bg-blue-400 text-black p-5 rounded-b-lg">
                                        {groupedData[post].map((name, i) => (
                                            <p key={i} className="text-lg font-medium text-center">{name}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className='text-lg text-gray-600 text-center'>No board of directors data available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
