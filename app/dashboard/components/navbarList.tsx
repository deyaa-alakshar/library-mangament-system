import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const list = ['Privacy policy', 'Warranty', 'Shippping', 'Returns'];

const NavbarList = () => {
  return (
    <ul className='md:flex justify-between items-center gap-4'>
      {list.map(element => (
         <li className='py-2 md:py-0'><Link href={""}  ><Text size={'2'} className='text-zinc-500'>{element}</Text></Link></li>
      ))}
    </ul>
  )
}

export default NavbarList
