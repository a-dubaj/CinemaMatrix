import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { removeMovie } from '../../../../../redux/actions/movieActions';
import ModalForm from '../Modals/Modal';
import moment from 'moment';

function DataTable(props) {
    const { movies } = props;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const columns = [
        {
            key: 'id',
            text: 'ID',
            sortable: true,
            cell: (movie, index) => {
                return index + 1;
            },
        },
        {
            key: 'poster',
            text: 'Plakat',
            sortable: true,
            cell: (movie) => {
                return <Image src={movie.poster} width={120}></Image>;
            },
        },
        {
            key: 'title',
            text: 'Tytuł',
            sortable: true,
            width: 150,
        },
        {
            key: 'director',
            text: 'Dyrektor',
        },
        {
            key: 'actor',
            text: 'Aktor',
            width: 200,
        },
        {
            key: 'genre',
            text: 'Gatunek',
            width: 200,
        },
        {
            key: 'running_time',
            text: 'Czas trwania',
            sortable: true,
        },
        {
            key: 'release_date',
            text: 'Data wydania',
            sortable: true,
            cell: (movie) => {
                return moment(movie.release_date).format('DD/MM/YYYY');
            },
            width: 120,
        },
        {
            key: 'trailer',
            text: 'Trailer',
            cell: (movie) => {
                let videoId = getId(movie.trailer);
                return (
                    <iframe
                        title={movie.title}
                        controls
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${videoId}`}
                    />
                );
            },
        },
        {
            key: 'state',
            text: 'Status',
            sortable: true,
            cell: (movie) => {
                return movie.state === 'now-showing' ? 'Now Showing' : 'Coming Soon';
            },
        },
        {
            key: 'active',
            text: 'Aktywny',
            sortable: true,
            cell: (movie) => {
                return movie.active === true ? 'True' : 'False';
            },
        },
        {
            key: 'action',
            text: 'Usuń',
            cell: (movie) => {
                return (
                    <Button className="button-trash" onClick={() => deleteMovie(movie.id)}>
                        <i className="bx bxs-trash-alt"></i>
                    </Button>
                );
            },
        },
    ];

    const config = {
        page_size: 6,
        show_filter: false,
        show_length_menu: false,
        show_pagination: true,
        pagination: 'advance',
    };

    const deleteMovie = (id) => {
        setIsShow((isShow) => !isShow);
        dispatch(removeMovie(id));
    };

    const onSort = (column, records, sortOrder) => {
        return orderBy(records, [column], [sortOrder]);
    };

    const getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    };

    const rowClickedHandler = (event, data, rowIndex) => {
        setData(data);
        setIsShow((isShow) => !isShow);
    };

    return (
        <>
            {isShow ? (
                <ModalForm isShow={isShow} data={data} method="eidt" title="Edytuj film" />
            ) : (
                ''
            )}
            <ReactDatatable
                responsive
                hover
                config={config}
                records={movies}
                columns={columns}
                onSort={onSort}
                onRowClicked={rowClickedHandler}
            />
        </>
    );
}

export default DataTable;