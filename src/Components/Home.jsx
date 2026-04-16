import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import CoffeeCard from './CoffeeCard';

const Home = () => {
    const initialcoffees = useLoaderData();
    const [coffees, setCoffees]= useState(initialcoffees)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {
                coffees.map(coffee=> <CoffeeCard key={coffee.price} coffees={coffees} setCoffees={setCoffees} coffee={coffee}></CoffeeCard>)
            }
        </div>
    );
};

export default Home;