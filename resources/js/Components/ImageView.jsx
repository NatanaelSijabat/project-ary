import { Button } from "flowbite-react";

export default function ImageView({ file, open }) {
    return file ? (
        <>
            <img
                src={`/storage/images/${file}`}
                width={100}
                height={100}
                alt="Image"
            />
        </>
    ) : (
        <Button onClick={() => open(true)}>Upload</Button>
    );
}

ImageView.defaultProps = {
    file: null,
};
