import { render } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

const photos = TEST_IMAGES;
const card = photos[0];

it("it renders", () => {
  render(
    <Card
        caption={card.caption}
        src={card.src}
        currNum={1}
        totalNum={1}
    />
  );
})

it ("it matches snapshot", () => {
    const { asFragment } = render(
        <Card
            caption={card.caption}
            src={card.src}
            currNum={1}
            totalNum={1}
        />);
    expect(asFragment()).toMatchSnapshot();
})