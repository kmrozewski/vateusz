import React, {useState} from 'react';
import RenameModal, {IRenameModal} from '../modal/RenameModal';
import RemoveModal, {IModal} from '../modal/RemoveModal';
import {Invoice} from '../../hooks/useInvoices';
import InvoiceTable from '../table/InvoiceTable';
import TabletAndDesktop from '../../breakpoint/TabletAndDesktop';
import Mobile from '../../breakpoint/Mobile';
import InvoiceCard from '../card/InvoiceCard';

interface IProps {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
}

const InvoiceContainer: React.FC<IProps> = ({invoices, fetchInvoices}) => {
  const [renameModal, setRenameModal] = useState<IRenameModal>({s3Key: '', fileName: '', show: false});
  const [removeModal, setRemoveModal] = useState<IModal>({s3Key: '', show: false});
  const onClose = async <T extends IModal>(modal: T, setModal: (modal: T) => void) => {
    setModal({...modal, show: false});
    await fetchInvoices();
  };

  const getInvoiceCards = () =>
    invoices.map(invoice => (
      <InvoiceCard key={invoice.s3Key} invoice={invoice} showRenameModal={setRenameModal} showRemoveModal={setRemoveModal} />
    ));

  return (
    <>
      <RenameModal {...renameModal} onClose={() => onClose(renameModal, setRenameModal)} />
      <RemoveModal {...removeModal} onClose={() => onClose(removeModal, setRemoveModal)} />
      <TabletAndDesktop>
        <InvoiceTable invoices={invoices} showRenameModal={setRenameModal} showRemoveModal={setRemoveModal} />
      </TabletAndDesktop>
      <Mobile>{getInvoiceCards()}</Mobile>
    </>
  );
};

export default InvoiceContainer;
