import { ReactElement, useState } from "react";
import Collapsible from "react-collapsible";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

type CategoryProps = {
    name: string | ReactElement<any>;
    defaultOpen?: boolean;
    additionalElement?: ReactElement<any>;
} & React.HTMLProps<Collapsible>;

export const Category: React.FC<CategoryProps> = ({ name, additionalElement, defaultOpen, children, ...props }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [lineHovered, setLineHovered] = useState(false);
    return (
        <Collapsible
            style={{
                width: "100%",
            }}
            open={isOpen}
            handleTriggerClick={() => setIsOpen(!isOpen)}
            trigger={
                <div style={{ display: "flex", cursor: "pointer" }}>
                    <div style={{ paddingRight: 2, paddingLeft: 2 }}>
                        {isOpen ? <BsChevronDown fontSize={10} /> : <BsChevronRight fontSize={10} />}
                    </div>
                    {name}
                    <div style={{ flex: 1 }} />
                    {additionalElement}
                </div>
            }
            {...props}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        minWidth: 14,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onPointerOver={() => setLineHovered(true)}
                    onPointerOut={() => setLineHovered(false)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        style={{
                            minWidth: 2,
                            height: "100%",
                            backgroundColor: lineHovered ? "#aaaaaa" : "#ffffff",
                            borderRadius: 2,
                        }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
            </div>
        </Collapsible>
    );
};
