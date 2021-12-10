import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  /* skews the red background to the right and rotates the text slightly to the left */
  transform: skew(-5deg) rotate(-1deg);
  /* negative margin-top slightly overlaps the text with the image */
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: var(--red);
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
