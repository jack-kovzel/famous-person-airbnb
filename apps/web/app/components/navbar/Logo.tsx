'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer"
      src="/images/logo_200x200.png"
      height="50"
      width="50"
      alt="Logo"
    />
  );
};

export default Logo;