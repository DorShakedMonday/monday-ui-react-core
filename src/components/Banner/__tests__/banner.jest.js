import React from "react";
import renderer from "react-test-renderer";
import Banner from "../Banner";

describe("Banner", () => {
  const mockTitle = "mock title";
  const mockSubtitle = "mock Subtitle";
  const mockRenderFunction = text => <div data-testid="custom_render">{text}</div>;

  it("should render correctly without props", () => {
    const tree = renderer.create(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with correct image position class - left", () => {
    const tree = renderer.create(<Banner imagePosition={Banner.imagePosition.LEFT} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with correct image position class - top", () => {
    const tree = renderer.create(<Banner imagePosition={Banner.imagePosition.TOP} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with correct image position class - right", () => {
    const tree = renderer.create(<Banner imagePosition={Banner.imagePosition.RIGHT} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with correct image position class - bottom", () => {
    const tree = renderer.create(<Banner imagePosition={Banner.imagePosition.BOTTOM} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render title, subtitle and image", function() {
    const tree = renderer
      .create(
        <Banner
          title={mockTitle}
          subtitle={mockSubtitle}
          imageSrc="mockImage.src"
          imageAlt="mock image alt"
          imageClassName="mock-image-classname"
          className="mock-classname"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should use custom render function for subtitle", function() {
    const tree = renderer
      .create(<Banner title={mockTitle} subtitle={mockSubtitle} renderSubtitle={mockRenderFunction} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should use custom render function for title", function() {
    const tree = renderer
      .create(<Banner title={mockTitle} subtitle={mockSubtitle} renderTitle={mockRenderFunction} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
