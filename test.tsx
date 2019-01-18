import { createElement } from "./index";

class Element {
  children: (Element | string)[] = [];
  constructor(public name: string) {}
  append(child: Element | string) {
    this.children.push(child);
  }
}
declare const global: any;
global.document = {
  createElement: (name: string) => {
    return new Element(name);
  }
};

test("jsx", () => {
  const ref: JSX.Reference<"h1"> = {};
  expect(
    <div>
      <h1 ref={ref}>hello</h1>
    </div>
  ).toMatchObject({
    name: "div",
    children: [{ name: "h1", children: ["hello"] }]
  });
  expect(ref.value).toMatchObject({ name: "h1", children: ["hello"] });
});

test("function", () => {
  function Layout(props: any) {
    return <div className="container">{props.children}</div>;
  }
  const ref: JSX.Reference<"div"> = {};
  expect(
    <Layout ref={ref}>
      <h1>hello</h1>
    </Layout>
  ).toMatchObject({
    name: "div",
    className: "container",
    children: [
      {
        name: "h1",
        children: ["hello"]
      }
    ]
  });
  expect(ref.value).toMatchObject({
    name: "div",
    className: "container",
    children: [
      {
        name: "h1",
        children: ["hello"]
      }
    ]
  });
});
