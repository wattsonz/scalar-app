import SortChecker from './SortChecker'

type Props = {}

export default function SortBy({ }: Props) {
    return (
        <div className="items">
            <div className="item">
                <SortChecker by="default" />
                <span className="text">Default</span>
            </div>
            <div className="item">
                <SortChecker by="price_high_to_low" />
                <span className="text">Price: High to Low</span>
            </div>
            <div className="item">
                <SortChecker by="price_low_to_high" />
                <span className="text">Price: Low to High</span>
            </div>
        </div>
    )
}