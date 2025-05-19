import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
// 4242 4242 4242 4242
import AppLayout from '@/layouts/AppLayout';
import { Orders, OrderWithId } from '@/types';

interface BookedCourseProps {
    orders: Orders[];
}
interface CheckoutFormProps {
    isOrderID: number;
    selectedOrder: Orders | null;
}
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RPCy1PglUmB3GStuJg3aPJIPc2D2TPyVuXriZGayOy52IVBi2AZl5yEKohBdVZFmJHn52suiB0EohNBHtkdEBqK00FmjUHjGx');

const CheckoutForm = ({ isOrderID, selectedOrder }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { post, data, setData } = useForm({
        order_number: '',
        amount: 0,
        stripeToken: '',
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card element not found.');
            return;
        }

        const result = await stripe.createToken(card);
        console.log('Stripe token result:', result);

        if (result.error) {
            setError(result.error.message || 'Payment failed.');
            return;
        }

        if (!selectedOrder) {
            setError('No order selected.');
            return;
        }

        setData({
            order_number: selectedOrder.order_number,
            amount: selectedOrder.amount,
            stripeToken: result.token.id,
        });

        post(route('stripe.order', { id: isOrderID }), {
            onSuccess: () => {
                setError('');
            },
            onError: () => {
                setError('Payment failed. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
            <label className="mb-2 block">Credit or debit card</label>
            <CardElement className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 py-3 pr-6 pl-4" />
            {error && <div className="mt-2 text-red-500">{error}</div>}
            <button type="submit" className="bg-brand-600 mt-4 rounded px-4 py-2 text-white" disabled={!stripe}>
                Submit Payment
            </button>
        </form>
    );
};

const BookedCourse = ({ orders }: BookedCourseProps) => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isOrderID, setOrderID] = useState<number>(0);
    const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
    const openModal = (id: number, order: Orders) => {
        setIsPaymentModalOpen(true);
        setOrderID(id);
        setSelectedOrder(order);
    };
    const closeModal = () => setIsPaymentModalOpen(false);

    return (
        <AppLayout>
            <Head title="Booked Courses" />

            <div className="space-y-3 rounded-md bg-white p-8 dark:bg-gray-900">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white/80">Booked Courses</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <thead className="bg-brand-900 text-base font-semibold text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Course Name</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600 dark:text-gray-200">
                            {orders.map((order, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="text-brand-900 px-4 py-3 font-medium dark:text-white">{order.course.title}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="inline-block rounded bg-gray-200 px-2 py-1 font-medium dark:bg-gray-700">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => openModal(order.id, order)}
                                            className="bg-brand-900 hover:bg-brand-900/90 rounded px-4 py-2 text-white transition"
                                        >
                                            Submit Payment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal */}
            {isPaymentModalOpen && selectedOrder && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/70">
                    <div className="relative w-full max-w-lg rounded-lg bg-white/90 p-5 shadow-lg">
                        <button
                            className="absolute top-3 right-3 rounded-full bg-black px-2 text-lg text-white hover:text-white"
                            onClick={closeModal}
                        >
                            {' '}
                            &times;{' '}
                        </button>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm isOrderID={isOrderID} selectedOrder={selectedOrder} />
                        </Elements>

                        {/* <div className="py-15">
                            <div className="space-y-4 px-8">
                                <h1 className="w-full text-center">Online Payment Method</h1>
                                <button className="bg-buyBtn hover:bg-buyBtn/90 mt-1 w-full cursor-pointer border-b-2 border-[#65b4ad] px-4 py-2 text-center text-white transition-colors sm:px-5 sm:py-3">
                                    Pay Now
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default BookedCourse;
