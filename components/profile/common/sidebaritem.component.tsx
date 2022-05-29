interface SidebarItemProps {
  text: string | number;
}

const SidebarItem = ({ text }: SidebarItemProps) => {
  return (
    <p
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="text-xs font-medium text-white"
    >
      {text}
    </p>
  );
};

export default SidebarItem;
