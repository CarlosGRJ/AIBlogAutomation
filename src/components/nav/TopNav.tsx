import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '../mode-toggle';

import { Toaster } from 'react-hot-toast';

export default function TopNav() {
  return (
    <div className='flex justify-between items-center m-2 pb-2 border-b-2'>
      <Toaster />
      <Link href='/'>
        <Image src='/images/logo.png' width={50} height={50} alt='logo' />
      </Link>
      <Link href='/dashboard/blog-automation'>Blog Automation</Link>
      <ModeToggle />
    </div>
  );
}
