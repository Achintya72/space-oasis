export default function RightButton({ size, onClick }) {
    return (
        <svg onClick={onClick} width={size} height={size} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M22.5 45C34.9264 45 45 34.9264 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45ZM21.2764 13.5623C20.3488 12.6347 18.8448 12.6347 17.9171 13.5623C16.9895 14.4899 16.9895 15.9939 17.9171 16.9216L24.9472 23.9516L17.9171 30.9817C16.9895 31.9093 16.9895 33.4133 17.9171 34.3409C18.8448 35.2686 20.3488 35.2686 21.2764 34.3409L29.9861 25.6313C30.9137 24.7036 30.9137 23.1996 29.9861 22.272L21.2764 13.5623Z" fill="currentColor" />
        </svg>
    )
}