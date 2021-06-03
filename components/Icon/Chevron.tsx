interface Props {
    width?: string;
    height?: string;
    direction: 'Up' | 'Down';
}

function Chevren({ width = '19', height = '19', direction }: Props) {
  if (direction === 'Up') {
    return (
      <svg width={width} height={height} viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" d="M0.335693 6.39062L6.18726 0.390625C6.45288 0.125 6.73413 0 7.06226 0C7.39819 0 7.68726 0.132812 7.94507 0.398438L13.7966 6.39062C13.9998 6.59375 14.1091 6.84375 14.1091 7.14844C14.1091 7.75 13.6248 8.24219 13.0232 8.24219C12.7263 8.24219 12.4373 8.125 12.2263 7.89844L7.07007 2.58594L1.90601 7.89844C1.68726 8.11719 1.41382 8.24219 1.10913 8.24219C0.507568 8.24219 0.0231934 7.75 0.0231934 7.14844C0.0231934 6.85156 0.132568 6.59375 0.335693 6.39062Z" fill="#E61B16" />
      </svg>
    );
  }
}

export default Chevren;
