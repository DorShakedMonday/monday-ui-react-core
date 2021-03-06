import React, { useRef, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import useMergeRefs from "../../hooks/useMergeRefs";
import { IMAGE_POSITIONS } from "./BannerConstants";
import "./Banner.scss";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import CloseSmall from "../Icon/Icons/components/CloseSmall";

const PRESERVE_VALUE = value => value;

const Banner = forwardRef(
  (
    {
      className,
      imageAlt,
      imageSrc,
      renderTitle,
      renderSubtitle,
      title,
      subtitle,
      imageClassName,
      imagePosition,
      onClose,
      rtl
    },
    ref
  ) => {
    const componentRef = useRef(null);
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] });

    const renderedTitle = useMemo(() => {
      const computedTitle = renderTitle(title);
      if (!computedTitle) return null;
      return <h1 className="banner--title">{computedTitle}</h1>;
    }, [title, renderTitle]);

    const renderedSubtitle = useMemo(() => {
      const computedSubtitle = renderSubtitle(subtitle);
      if (!computedSubtitle) return null;
      return <h2 className="banner--subtitle">{computedSubtitle}</h2>;
    }, [subtitle, renderSubtitle]);

    const renderImage = useMemo(() => {
      if (!imageSrc) return null;
      return <img src={imageSrc} alt={imageAlt} className={cx("banner--image", imageClassName)} />;
    }, [imageAlt, imageSrc, imageClassName]);

    const renderCloseButton = useMemo(() => {
      if (!onClose) return null;
      return (
        <Button
          onClick={onClose}
          className="banner--close"
          size={Button.sizes.SMALL}
          kind={Button.kinds.TERTIARY}
          color={Button.colors.PRIMARY}
          ariaLabel="close-banner"
        >
          <Icon iconType={Icon.type.SVG} clickable={false} icon={CloseSmall} iconSize="16px" ignoreFocusStyle />
        </Button>
      );
    }, [onClose]);

    return (
      <aside ref={mergedRef} className={cx("banner", className, { rtl })}>
        <div
          className={cx("banner--content", `image-position__${imagePosition}`, {
            "close-button-spacing": !!renderCloseButton
          })}
        >
          {renderCloseButton}
          {renderedTitle}
          {renderedSubtitle}
          {renderImage}
        </div>
      </aside>
    );
  }
);

Banner.imagePosition = IMAGE_POSITIONS;

Banner.propTypes = {
  /**
   * custom style
   */
  className: PropTypes.string,
  /**
   * image alt attribute
   */
  imageAlt: PropTypes.string,
  /**
   * image source
   */
  imageSrc: PropTypes.string,
  /**
   * determines the image position
   */
  imagePosition: PropTypes.oneOf([
    Banner.imagePosition.LEFT,
    Banner.imagePosition.RIGHT,
    Banner.imagePosition.BOTTOM,
    Banner.imagePosition.TOP
  ]),
  /**
   * image custom style
   */
  imageClassName: PropTypes.string,
  /**
   * title custom render
   */
  renderTitle: PropTypes.func,
  /**
   * subtitle custom render
   */
  renderSubtitle: PropTypes.func,
  /**
   * title value
   */
  title: PropTypes.string,
  /**
   * sub title value
   */
  subtitle: PropTypes.string,
  /**
   * Add X button to the component when initialized and called when the button is clicked
   */
  onClose: PropTypes.func,
  /**
   * Change to "Right to Left" if set to `true`. Defaults to "Left to Right"
   */
  rtl: PropTypes.bool
};

Banner.defaultProps = {
  className: "",
  imagePosition: IMAGE_POSITIONS.LEFT,
  imageAlt: "Banner main image",
  imageSrc: "",
  renderTitle: PRESERVE_VALUE,
  renderSubtitle: PRESERVE_VALUE,
  title: "",
  subtitle: "",
  imageClassName: "",
  rtl: false,
  onClose: null
};

export default Banner;
