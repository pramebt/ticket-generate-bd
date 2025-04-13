"use client"; // Ensure this is a client-side component

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

const Ticket = () => {
    const searchParams = useSearchParams();
    const fullname = searchParams.get("fullname") || "Guest"; // Default to "Guest" if fullname is not available
    const github = searchParams.get("github") || "N/A"; // Default to "N/A" if github is not available

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        // Ensure localStorage is accessed only on the client side
        const storedAvatarUrl = localStorage.getItem("avatarUrl");
        setAvatarUrl(storedAvatarUrl ?? "/assets/images/default-avatar.png"); // Default avatar if not found
    }, []); // Empty dependency array ensures this runs only once after component mounts

    return (
        <div className="bg-[url('/assets/images/pattern-ticket.svg')] bg-contain bg-no-repeat w-full max-w-lg mx-auto aspect-15/7 mt-10
            grid grid-cols-[85%_15%] grid-rows-2 grid-flow-col p-5 items-center md:gap-y-10">
            <div className='grid grid-cols-[20%_auto] grid-rows-2'>
                <Image src='/assets/images/logo-mark.svg' alt='Logo' className='row-span-2 self-center' width={40} height={40} />
                <h3 className='text-xl font-bold md:text-2xl'>Coding Conf</h3>
                <span className='text-sm text-neutral-400 font-light md:text-lg'>Jan 31, 2025 / Austin, TX</span>
            </div>
            <div className='grid grid-cols-[20%_auto] grid-rows-2'>
                {/* Only render the Image component if avatarUrl is not null */}
                {avatarUrl && (
                    <Image
                        src={avatarUrl}
                        alt='avatar'
                        className='aspect-square w-12 md:w-14 rounded-xl row-span-2 self-center'
                        width={56}  // Set width and height for optimization
                        height={56}
                    />
                )}
                <h3 className='text-xl md:text-2xl'>{fullname}</h3>
                <div className='flex gap-2 content-center self-center'>
                    <Image src='/assets/images/icon-github.svg' alt='github-logo' className='aspect-square w-5' />
                    <span className='text-sm text-neutral-400 font-light md:text-lg'>{github}</span>
                </div>
            </div>
            <p className='row-span-2 text-2xl text-neutral-400 h-fit place-self-center self-center writing-vertical'>#01609</p>
        </div>
    );
}

export default Ticket;
