/**
 * Line break that hides on mobile so accent text flows and wraps naturally.
 * On mobile: renders a space so main + accent text don't concatenate ("business.invested" → "business. invested").
 * On desktop: renders <br /> for the two-line layout.
 */
export function AccentBr() {
    return (
        <>
            <span className="md:hidden"> </span>
            <br className="hidden md:block" />
        </>
    );
}
