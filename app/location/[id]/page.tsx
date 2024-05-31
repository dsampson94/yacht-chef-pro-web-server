'use client';

import { useRouter } from 'next/router';
import ResourceEdit from '../../../components/ResourceEdit';
import { RESOURCES } from '../../../lib/constants';

const EditLocation = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <ResourceEdit
            id={id as string}
            resource={RESOURCES.LOCATIONS}
            fields={[
                { label: 'City', key: 'city' },
                { label: 'Country', key: 'country' }
            ]}
        />
    );
};

export default EditLocation;