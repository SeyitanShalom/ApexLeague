import Image from "next/image";
import React from "react";
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-3 mt-40">
      <div className="flex items-center gap-1 -mb-3">
        <Image src="/JV Logo.webp" alt="Logo" width={70} height={70} />
        <p className="text-3xl -translate-y-0.5 translate-x-0.5">|</p>
        <Image src="/Apex Logo.png" alt="Logo" width={80} height={70} />
      </div>
      <div className="flex items-center">
        <ImLocation2 className="w-5 h-5 text-(--color-primary)" />
        <p className="text-xs">
          Off, no 20, Abundant Grace Of God Trade Centre,
          <br />
          Off Akure High School Road, Akure, Ondo State.
        </p>
      </div>
      <div className="flex items-center gap-0.5">
        <FaPhone className="scale-80 text-(--color-primary)" />
        <p className="text-xs">+234 813 488 0560, +234 906 475 0948</p>
      </div>
      <div className="flex items-center gap-0.5">
        <IoLogoWhatsapp className="scale-90 text-(--color-primary)" />
        <p className="text-xs">+234 814 589 0364</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          <FaFacebook className="scale-80 text-(--color-primary)" />
          <p className="text-xs">Apex League</p>
        </div>
        <div className="flex items-center gap-0.5">
          <BiLogoGmail className="scale-80 text-(--color-primary)" />
          <p className="text-xs">hello.apexleague@gmail.com</p>
        </div>
        <div className="flex items-center gap-0.5">
          <RiInstagramFill className="scale-80 text-(--color-primary)" />
          <p className="text-xs">Apex.League01</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
